import chalk from 'chalk'
import fs, { existsSync, mkdirSync } from 'fs'
import { request } from 'https'
import sharp from 'sharp'

const loadingImages = new Map<string, ((path: string) => Promise<void>)[]>()

const regex =
  />([0-9K+]{0,})<\/div><div class="[A-Za-z0-9]{0,10}">Downloads<\/div>/g

export function roundDownloads(downloads: number) {
  if (isNaN(downloads)) return null
  const format = Intl.NumberFormat('en-Us').format

  if (downloads < 1000) {
    return format(downloads)
  } else if (downloads < 1000000) {
    return `${format(Math.round(downloads / 1000))}K+`
  } else {
    return `${format(Math.round(downloads / 1000000))}M+`
  }
}

export function stringToNumber(number: string) {
  if (number.includes('K')) {
    return parseInt(number.replace('K', '')) * 1000
  } else if (number.includes('+')) {
    return parseInt(number.replace('+', '')) + 1
  } else {
    return parseInt(number)
  }
}

export async function playStoreDownloads(packageName: string) {
  try {
    const html = await fetch(
      `https://play.google.com/store/apps/details?id=${packageName}`
    ).then((res) => res.text())
    const result = regex.exec(html.match(regex)?.[0] ?? '')
    return result ? stringToNumber(result[1]) : null
  } catch (e) {
    return null
  }
}

export async function gitHubDownloads(
  owner: string,
  repo: string,
  release: string = 'latest',
  allReleases: boolean = false,
  assetsToCount: (asset: {
    name: string
    download_count: number
    [key: string]: any
  }) => boolean = () => true
) {
  try {
    if (allReleases) {
      const releases = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/releases?per_page=100`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        }
      ).then((res) => res.json())
      return releases
        .map((release: { assets: any[] }) =>
          release.assets
            .filter(assetsToCount)
            .reduce(
              (acc: number, asset: { download_count: number }) =>
                acc + asset.download_count,
              0
            )
        )
        .reduce((acc: number, downloads: number) => acc + downloads, 0)
    } else {
      const releaseData = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/releases/${release}`,
        {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        }
      ).then((res) => res.json())
      return releaseData.assets
        .filter(assetsToCount)
        .reduce(
          (acc: number, asset: { download_count: number }) =>
            acc + asset.download_count,
          0
        )
    }
  } catch (e) {
    return 0
  }
}

export function sizeToHumanReadable(size: number) {
  if (size < 1000) {
    return `${size} B`
  } else if (size < 1000000) {
    return `${(size / 1000).toFixed(1)} KB`
  } else if (size < 1000000000) {
    return `${(size / 1000000).toFixed(1)} MB`
  } else {
    return `${(size / 1000000000).toFixed(1)} GB`
  }
}

export function millisecondsToHumanReadable(time: number) {
  if (time < 1000) {
    return `${time} ms`
  } else if (time < 60000) {
    return `${(time / 1000).toFixed(1)} s`
  } else if (time < 3600000) {
    return `${(time / 60000).toFixed(1)} min`
  } else {
    return `${(time / 3600000).toFixed(1)} h`
  }
}

export async function getImageBuffer(url: string) {
  return new Promise<Buffer>((resolve, reject) => {
    request(url, (res) => {
      const chunks: Uint8Array[] = []
      res.on('data', (chunk) => chunks.push(chunk))
      res.on('end', () => resolve(Buffer.concat(chunks)))
      res.on('error', reject)
    }).end()
  })
}

export async function createFaviconWithBadge(
  favicon: { url?: string; file?: string },
  badge: { url?: string; file?: string },
  name: string
) {
  const imageName = `${name.replace(/[^a-zA-Z0-9+#]/g, '_')}-${
    process.env.NEXT_PUBLIC_RUN_ID
  }`

  const startTime = Date.now()
  const relativeUrl = `/images/cached/favicons/${imageName}.webp`
  const absoluteUrl = `${process.cwd()}/public${relativeUrl}`

  const faviconBuffer = favicon.url
    ? await getImageBuffer(favicon.url)
    : favicon.file
    ? fs.readFileSync(favicon.file)
    : null

  if (!faviconBuffer) throw new Error('No favicon buffer')

  const badgeBuffer = badge.url
    ? await getImageBuffer(badge.url)
    : badge.file
    ? fs.readFileSync(badge.file)
    : null

  if (favicon.url)
    log(
      chalk.blue('Dwnld'),
      chalk.white(`  - ${new URL(favicon.url).host} ... ${imageName}`)
    )
  else if (favicon.file)
    log(chalk.blue('Cache'), chalk.white(`  - ${favicon.file}`))

  if (!badgeBuffer) throw new Error('No badge buffer')

  const rect = Buffer.from(
    '<svg><rect x="0" y="0" width="200" height="200" rx="25" ry="25"/></svg>'
  )

  const image = await sharp(
    await sharp(faviconBuffer)
      .resize(200, 200, {
        fit: 'contain',
        position: 'center',
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .composite([
        {
          input: rect,
          blend: 'dest-in',
        },
      ])
      .toBuffer()
  )
    .extend({
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .composite([
      {
        input: await sharp(badgeBuffer).resize(100, 100).toBuffer(),
        gravity: 'southeast',
      },
    ])
    .webp()
    .toFile(absoluteUrl)

  setSize(image.size, Date.now() - startTime)

  return relativeUrl
}

const log = (...message: string[]) =>
  console.log([chalk.bgYellow(chalk.black(`[Image]`)), ...message].join(' '))

const setSize = (size: number, duration: number) => {
  const current = Number(process.env.TOTAL_SIZE)
  const totalCount = Number(process.env.TOTAL_COUNT)
  const totalDuration = Number(process.env.TOTAL_DURATION)

  process.env.TOTAL_SIZE = ((isNaN(current) ? 0 : current) + size).toString()
  process.env.TOTAL_COUNT = (
    (isNaN(totalCount) ? 0 : totalCount) + 1
  ).toString()
  process.env.TOTAL_DURATION = (
    (isNaN(totalDuration) ? 0 : totalDuration) + duration
  ).toString()

  if (process.env.GITHUB_OUTPUT) {
    let env = fs.readFileSync(process.env.GITHUB_OUTPUT, 'utf-8')
    if (env.includes('size=')) {
      env = env.replace(
        /size=[0-9A-z. ]+/g,
        `size=${sizeToHumanReadable(Number(process.env.TOTAL_SIZE))}`
      )
    } else
      env += `size=${sizeToHumanReadable(Number(process.env.TOTAL_SIZE))}\n`

    if (env.includes('count=')) {
      env = env.replace(/count=[0-9]+/g, `count=${process.env.TOTAL_COUNT}`)
    } else env += `count=${process.env.TOTAL_COUNT}\n`

    if (env.includes('duration=')) {
      env = env.replace(
        /duration=[0-9A-z. ]+/g,
        `duration=${millisecondsToHumanReadable(
          Number(process.env.TOTAL_DURATION)
        )}`
      )
    } else
      env += `duration=${millisecondsToHumanReadable(
        Number(process.env.TOTAL_DURATION)
      )}\n`

    fs.writeFileSync(process.env.GITHUB_OUTPUT, env)
  } else
    log(
      `Total size: ${sizeToHumanReadable(
        Number(process.env.TOTAL_SIZE)
      )}, Total count: ${
        process.env.TOTAL_COUNT
      }, Total duration: ${millisecondsToHumanReadable(
        Number(process.env.TOTAL_DURATION)
      )}`
    )
}

export async function cacheImageLocally(props: {
  url?: string
  file?: string
  imageName: string
  path?: string
  svg?: boolean
  newWidth?: number
  newHeight?: number
}) {
  const { url, file, imageName: name, path, svg, newWidth, newHeight } = props

  const imageName = `${name.replace(/[^a-zA-Z0-9+#]/g, '_')}-${
    process.env.NEXT_PUBLIC_RUN_ID
  }`

  const internalPath = path ? `${path}/` : ''

  const relativeUrl = `/images/cached/${internalPath}${imageName}.${
    svg || (url ?? file)?.endsWith('svg') ? 'svg' : 'webp'
  }`
  const absoluteUrl = `${process.cwd()}/public${relativeUrl}`
  const publicRelativeUrl = `/images/cached/${internalPath}${encodeURIComponent(
    imageName
  )}.${svg || (url ?? file)?.endsWith('svg') ? 'svg' : 'webp'}`

  const finishLoadingImages = async (url: string) => {
    await Promise.all(
      loadingImages.get(publicRelativeUrl)?.map((fn) => fn(url)) ?? []
    )
    loadingImages.delete(url)
  }

  const startTime = Date.now()

  try {
    const key = (url ?? file)?.split('/').pop() ?? ''
    const fileName = relativeUrl.replace('/images/cached/', '')

    if (existsSync(absoluteUrl)) return publicRelativeUrl

    if (loadingImages.has(publicRelativeUrl)) {
      const imageUrl = await new Promise((resolve) => {
        loadingImages
          .get(publicRelativeUrl)
          ?.push(async (url) => resolve(url)) ?? resolve('')
      }).catch(() => '')

      log(chalk.hex('#b560ca')('Loaded'), chalk.white(` - ${fileName}`))

      return (imageUrl as string) ?? ''
    }

    loadingImages.set(publicRelativeUrl, [])

    if (url)
      log(
        chalk.blue('Dwnld'),
        chalk.white(`  - ${new URL(url).host} ... ${key}`)
      )
    else if (file) log(chalk.blue('Cache'), chalk.white(`  - ${file}`))

    const buffer = url
      ? await getImageBuffer(url)
      : file
      ? fs.readFileSync(file)
      : null

    if (!buffer) throw new Error('No buffer')

    mkdirSync(`${process.cwd()}/public/images/cached/${internalPath}`, {
      recursive: true,
    })

    if ((file && svg) || file?.endsWith('.svg')) {
      fs.writeFileSync(absoluteUrl, buffer)

      const duration = Date.now() - startTime

      const size = fs.fstatSync(fs.openSync(absoluteUrl, 'r')).size

      log(chalk.green('Cached'), chalk.white(`- ${key} -> ${fileName}`))
      await finishLoadingImages(publicRelativeUrl)
      log(
        chalk.cyan(sizeToHumanReadable(size)),
        'in',
        chalk.cyan(duration),
        'ms'
      )
      setSize(size, duration)
      log()

      return publicRelativeUrl
    }

    if ((url && svg) || url?.endsWith('.svg')) {
      fs.writeFileSync(absoluteUrl, buffer)

      const duration = Date.now() - startTime

      const size = fs.fstatSync(fs.openSync(absoluteUrl, 'r')).size

      log(chalk.green('Cached'), chalk.white(`\t- ${key} -> ${fileName}`))
      await finishLoadingImages(publicRelativeUrl)
      log(
        chalk.cyan(sizeToHumanReadable(size)),
        'in',
        chalk.cyan(duration),
        'ms'
      )
      setSize(size, duration)
      log()

      return publicRelativeUrl
    }

    const image = sharp(buffer)
    const metadata = await image.metadata()
    const { width, height } = metadata
    const resizedImage = image.resize(newWidth ?? width, newHeight ?? height, {
      fit: 'contain',
      position: 'center',
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })

    const output = await resizedImage.webp().toFile(absoluteUrl)

    const duration = Date.now() - startTime

    log(chalk.green('Cached'), chalk.white(`\t- ${key} -> ${fileName}`))
    await finishLoadingImages(publicRelativeUrl)
    log(
      chalk.cyan(sizeToHumanReadable(output.size)),
      'in',
      chalk.cyan(duration),
      'ms'
    )
    setSize(output.size, duration)
    log()

    return publicRelativeUrl
  } catch (e) {
    log(chalk.red('Failed'), chalk.white(`\t- download ${url}\n${e}\n\n`))

    await finishLoadingImages('')
    return url ?? file ?? ''
  }
}
