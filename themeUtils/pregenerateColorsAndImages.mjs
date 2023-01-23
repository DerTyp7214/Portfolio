import Color from 'color'
import * as dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { generatePreview } from './generateKeyboardPreview.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const { parsed: env } = dotenv.config({ path: `${__dirname}/../.env.local` })

const version = (proccess.env ?? env).NEXT_PUBLIC_RUN_ID

const manifest = {
  id: version,
  name: 'DerTyp7214.de',
  short_name: 'DerTyp7214.de',
  description: 'DerTyp7214.de - Small website with stuff id did',
  icons: [],
  theme_color: '#000000',
  background_color: '#000000',
  start_url: '/',
  protocol_handlers: [],
  display: 'standalone',
  orientation: 'portrait',
}

const rboardManifest = {
  ...manifest,
  id: `rboard-${version}`,
  name: 'RBoard',
  short_name: 'RBoard',
  description: 'RBoard - Rboard PWA',
  start_url: '/rboard',
}

const creatorManifest = {
  ...manifest,
  id: `creator-${version}`,
  name: 'Creator',
  short_name: 'Creator',
  description: 'Creator - Creator PWA',
  start_url: '/creator',
}

const randomColor = Color.rgb(
  Math.floor(Math.random() * 255),
  Math.floor(Math.random() * 255),
  Math.floor(Math.random() * 255)
)

const white = Color.rgb(255, 255, 255)
const black = Color.rgb(0, 0, 0)

const accentDark = randomColor.saturate(1.1).mix(white).lightness(70)
const accent = accentDark.negate().rotate(180)
const desaturatedAccentDark = accentDark.desaturate(0.5)
const desaturatedAccent = desaturatedAccentDark.negate().rotate(180)
const tertiaryDark = accentDark.rotate(180)
const tertiary = tertiaryDark.negate().rotate(180)
const desaturatedTertiaryDark = tertiaryDark.desaturate(0.5)
const desaturatedTertiary = desaturatedTertiaryDark.negate().rotate(180)
const backgroundDark = randomColor
  .lightness(40)
  .rotate(120)
  .desaturate(0.95)
  .mix(black)
const secondaryBackgroundDark = backgroundDark.lighten(0.3)
const background = backgroundDark.negate().rotate(180)
const secondaryBackground = secondaryBackgroundDark.negate().rotate(180)

const modifySvgColors = async (input, output, asSvg = false) => {
  const svg = fs.readFileSync(input, 'utf8')
  const newSvg = svg
    .replace(/%accent%/g, accentDark.hex())
    .replace(/%desaturated_accent%/g, desaturatedAccentDark.hex())
    .replace(/%desaturated_tertiary%/g, desaturatedTertiaryDark.hex())
    .replace(/%tertiary%/g, tertiaryDark.hex())
    .replace(/%background%/g, backgroundDark.hex())
    .replace(/%secondary_background%/g, secondaryBackgroundDark.hex())
    .replace(/%accent_background%/g, accentDark.mix(backgroundDark, 0.8).hex())
    .replace(
      /%tertiary_background%/g,
      desaturatedTertiaryDark.mix(secondaryBackgroundDark, 0.8).hex()
    )

  if (asSvg) fs.writeFileSync(output, newSvg)
  else await sharp(Buffer.from(newSvg)).png().toFile(output)
}

const createScaledFavicons = async () => {
  const sizes = [16, 32, 96, 192, 384, 512]

  const rect = Buffer.from(
    '<svg><rect x="0" y="0" width="512" height="512" rx="64" ry="64"/></svg>'
  )

  const faviconSvg = fs
    .readFileSync('./assets/raw/favicon.svg', 'utf8')
    .replace(/%accent%/g, desaturatedAccent.hex())
    .replace(/%accent_dark%/g, accentDark.hex())

  const favicon = await sharp(Buffer.from(faviconSvg))
    .resize(512, 512, {
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
    .png()
    .toBuffer()

  const saveWithSize = async (size) => {
    await sharp(favicon)
      .resize(size, size)
      .png()
      .toFile(`./public/icons/favicon-${size}x${size}_${version}.png`)
  }

  await new Promise((resolve) => rimraf('./public/icons', resolve))
  fs.mkdirSync('./public/icons')

  await Promise.all([
    sharp(favicon).resize(196, 196).png().toFile('./public/favicon.ico'),
    sharp(favicon).resize(196, 196).png().toFile('./public/favicon.png'),
    sharp(favicon).resize(420, 420).png().toFile('./assets/parsed/profile.png'),
    ...sizes.map(saveWithSize),
  ])

  manifest.icons = sizes.map((size) => ({
    src: `/icons/favicon-${size}x${size}_${version}.png`,
    sizes: `${size}x${size}`,
    type: 'image/png',
  }))
}

const createScaledRboardIcons = async () => {
  const sizes = [16, 32, 96, 192, 384, 512]

  const rect = Buffer.from(
    '<svg><rect x="0" y="0" width="512" height="512" rx="64" ry="64"/></svg>'
  )

  const rboardSvg = fs
    .readFileSync('./assets/raw/rboardThemeManager.svg', 'utf8')
    .replace(/%desaturated_accent%/g, desaturatedAccentDark.hex())
    .replace(/%accent_background%/g, accentDark.mix(backgroundDark, 0.8).hex())

  const rboard = await sharp(Buffer.from(rboardSvg))
    .resize(512, 512, {
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
    .png()
    .toBuffer()

  const saveWithSize = async (size) => {
    await sharp(rboard)
      .resize(size, size)
      .png()
      .toFile(`./public/icons/rboard-${size}x${size}_${version}.png`)
  }

  await Promise.all(sizes.map(saveWithSize))

  rboardManifest.icons = sizes.map((size) => ({
    src: `/icons/rboard-${size}x${size}_${version}.png`,
    sizes: `${size}x${size}`,
    type: 'image/png',
  }))
}

const createScaledCreatorIcons = async () => {
  const sizes = [16, 32, 96, 192, 384, 512]

  const creatorSvg = fs
    .readFileSync('./assets/raw/creator.svg', 'utf8')
    .replace(/%accent%/g, accentDark.hex())

  const creator = await sharp(Buffer.from(creatorSvg))
    .resize(512, 512, {
      fit: 'contain',
      position: 'center',
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toBuffer()

  const saveWithSize = async (size) => {
    await sharp(creator)
      .resize(size, size)
      .png()
      .toFile(`./public/icons/creator-${size}x${size}_${version}.png`)
  }

  await Promise.all(sizes.map(saveWithSize))

  creatorManifest.icons = sizes.map((size) => ({
    src: `/icons/creator-${size}x${size}_${version}.png`,
    sizes: `${size}x${size}`,
    type: 'image/png',
  }))
}

const saveEnv = () => {
  const newEnv = `NEXT_PUBLIC_COLOR_SEED=${randomColor.hex()}
NEXT_PUBLIC_COLOR_ACCENT=${accent.hex()}
NEXT_PUBLIC_COLOR_ACCENT_DARK=${accentDark.hex()}
NEXT_PUBLIC_COLOR_DESATURATED_ACCENT=${desaturatedAccent.hex()}
NEXT_PUBLIC_COLOR_DESATURATED_ACCENT_DARK=${desaturatedAccentDark.hex()}
NEXT_PUBLIC_COLOR_TERTIARY=${tertiary.hex()}
NEXT_PUBLIC_COLOR_TERTIARY_DARK=${tertiaryDark.hex()}
NEXT_PUBLIC_COLOR_DESATURATED_TERTIARY=${desaturatedTertiary.hex()}
NEXT_PUBLIC_COLOR_DESATURATED_TERTIARY_DARK=${desaturatedTertiaryDark.hex()}
NEXT_PUBLIC_COLOR_BACKGROUND_DARK=${backgroundDark.hex()}
NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND_DARK=${secondaryBackgroundDark.hex()}
NEXT_PUBLIC_COLOR_BACKGROUND=${background.hex()}
NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND=${secondaryBackground.hex()}
`

  fs.writeFileSync('./.env', newEnv)
}

async function proccess() {
  if (!fs.existsSync('./public/assets')) fs.mkdirSync('./public/assets')
  if (!fs.existsSync('./assets/parsed')) fs.mkdirSync('./assets/parsed')

  saveEnv()

  await Promise.all([
    modifySvgColors(
      './assets/raw/og-image.svg',
      './public/assets/og-image.png'
    ),

    modifySvgColors(
      './assets/raw/rboardThemeManager.svg',
      './assets/parsed/rboardThemeManager.svg',
      true
    ),
    modifySvgColors(
      './assets/raw/rboardImeTester.svg',
      './assets/parsed/rboardImeTester.svg',
      true
    ),
    modifySvgColors(
      './assets/raw/rboardThemeCreator.svg',
      './assets/parsed/rboardThemeCreator.svg',
      true
    ),
    modifySvgColors(
      './assets/raw/rboardPatcher.svg',
      './assets/parsed/rboardPatcher.svg',
      true
    ),
    modifySvgColors(
      './assets/raw/mixThemeCreator.svg',
      './assets/parsed/mixThemeCreator.svg',
      true
    ),
    modifySvgColors(
      './assets/raw/ytmdRemote.svg',
      './assets/parsed/ytmdRemote.svg',
      true
    ),
    modifySvgColors(
      './assets/raw/creator.svg',
      './assets/parsed/creator.svg',
      true
    ),

    generatePreview(backgroundDark, accentDark).then(buffer => {
      fs.writeFileSync('./public/assets/og-image-creator.png', buffer)
    }),

    createScaledFavicons().then(createScaledRboardIcons).then(createScaledCreatorIcons),
  ])

  manifest.theme_color = accentDark.hex()
  manifest.background_color = backgroundDark.hex()

  rboardManifest.theme_color = accentDark.hex()
  rboardManifest.background_color = backgroundDark.hex()

  creatorManifest.theme_color = accentDark.hex()
  creatorManifest.background_color = backgroundDark.hex()

  fs.writeFileSync('./public/manifest.json', JSON.stringify(manifest, null, 4))
  fs.writeFileSync('./public/rboard-manifest.json', JSON.stringify(rboardManifest, null, 4))
  fs.writeFileSync('./public/creator-manifest.json', JSON.stringify(creatorManifest, null, 4))
}

proccess().then(() => {
  console.log(`Seed: ${randomColor.hex()}
Accent: ${accent.hex()}
Accent Dark: ${accentDark.hex()}
Desaturated Accent: ${desaturatedAccent.hex()}
Desaturated Accent Dark: ${desaturatedAccentDark.hex()}
Tertiary: ${tertiary.hex()}
Tertiary Dark: ${tertiaryDark.hex()}
Desaturated Tertiary: ${desaturatedTertiary.hex()}
Desaturated Tertiary Dark: ${desaturatedTertiaryDark.hex()}
Background Dark: ${backgroundDark.hex()}
Secondary Background Dark: ${secondaryBackgroundDark.hex()}
Background: ${background.hex()}
Secondary Background: ${secondaryBackground.hex()}
`)
})
