import { request } from 'https'
import { existsSync, mkdirSync } from 'fs'
import sharp from 'sharp'
import chalk from 'chalk'
import fs from 'fs'

const regex =
  />([0-9K+]{0,})<\/div><div class="[A-Za-z0-9]{0,10}">Downloads<\/div>/g

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

export async function cacheImageLocally(props: {
  url?: string
  file?: string
  imageName: string
  path?: string
  newWidth?: number
  newHeight?: number
}) {
  const { url, file, imageName, path, newWidth, newHeight } = props

  const internalPath = path ? `${path}/` : ''

  try {
    const relativeUrl = `/images/cached/${internalPath}${imageName}.${
      (url ?? file)?.endsWith('svg') ? 'svg' : 'webp'
    }`
    const absoluteUrl = `${process.cwd()}/public${relativeUrl}`
    const publicRelativeUrl = `/images/cached/${internalPath}/${encodeURIComponent(
      imageName
    )}.${(url ?? file)?.endsWith('svg') ? 'svg' : 'webp'}`

    if (existsSync(absoluteUrl)) return publicRelativeUrl

    const buffer = url
      ? await getImageBuffer(url)
      : file
      ? fs.readFileSync(file)
      : null

    if (!buffer) return url ?? file ?? ''

    if (url) console.log(chalk.blue(`Downloading ${url}`))
    else console.log(chalk.blue(`Caching ${file}`))

    if (file?.endsWith('.svg')) {
      fs.writeFileSync(absoluteUrl, buffer)
      return publicRelativeUrl
    }

    if (url?.endsWith('.svg')) {
      fs.writeFileSync(absoluteUrl, buffer)
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

    mkdirSync(`${process.cwd()}/public/images/cached/${internalPath}`, {
      recursive: true,
    })

    const output = await resizedImage.webp().toFile(absoluteUrl)
    const size = output.size / 1000

    console.log(
      chalk.green(`Saved ${url ?? file} to ${relativeUrl} (${size} KB)`)
    )

    return publicRelativeUrl
  } catch (e) {
    console.log(chalk.red(`Failed to download ${url}\n`))

    return url ?? file ?? ''
  }
}
