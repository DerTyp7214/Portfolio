const Color = require('color')
const fs = require('fs')
const sharp = require('sharp')

const manifest = {
    name: 'DerTyp7214.de',
    short_name: 'DerTyp7214.de',
    description: 'DerTyp7214.de - Small website with stuff id did',
    icons: [],
    theme_color: '#000000',
    background_color: '#000000',
    start_url: '/',
    protocol_handlers: [
        {
            protocol: 'web+derTyp7214',
            url: '/',
        },
        {
            protocol: 'web+rboard',
            url: '/rboard',
        }
    ],
    display: 'standalone',
    orientation: 'portrait'
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
const desaturatedAccentDark = accentDark.desaturate(.5)
const desaturatedAccent = desaturatedAccentDark.negate().rotate(180)
const tertiaryDark = accentDark.rotate(180)
const tertiary = tertiaryDark.negate().rotate(180)
const desaturatedTertiaryDark = tertiaryDark.desaturate(.5)
const desaturatedTertiary = desaturatedTertiaryDark.negate().rotate(180)
const backgroundDark = randomColor.lightness(40).rotate(120).desaturate(.95).mix(black)
const secondaryBackgroundDark = backgroundDark.lighten(.3)
const background = backgroundDark.negate().rotate(180)
const secondaryBackground = secondaryBackgroundDark.negate().rotate(180)

const newEnv = `NEXT_PUBLIC_COLOR_ACCENT=${accent.hex()}
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

manifest.theme_color = accentDark.hex()
manifest.background_color = backgroundDark.hex()

const modifySvgColors = async (input, output, asSvg = false) => {
    const svg = fs.readFileSync(input, 'utf8')
    const newSvg = svg
        .replace(/%accent%/g, accentDark.hex())
        .replace(/%desaturated_accent%/g, desaturatedAccentDark.hex())
        .replace(/%desaturated_tertiary%/g, desaturatedTertiaryDark.hex())
        .replace(/%tertiary%/g, tertiaryDark.hex())
        .replace(/%background%/g, backgroundDark.hex())
        .replace(/%secondary_background%/g, secondaryBackgroundDark.hex())
        .replace(/%accent_background%/g, accentDark.mix(backgroundDark, .8).hex())
        .replace(/%tertiary_background%/g, desaturatedTertiaryDark.mix(secondaryBackgroundDark, .8).hex())

    if (asSvg) fs.writeFileSync(output, newSvg)
    else await sharp(Buffer.from(newSvg)).png()
        .toFile(output)
}

const createScaledFavicons = async () => {
    const sizes = [16, 32, 96, 192, 384, 512]

    const rect = Buffer.from(
        '<svg><rect x="0" y="0" width="512" height="512" rx="64" ry="64"/></svg>'
    )

    const faviconSvg = fs.readFileSync('./assets/raw/favicon.svg', 'utf8')
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
            .toFile(`./public/icons/favicon-${size}x${size}.png`)
    }

    await Promise.all([
        sharp(favicon)
            .resize(196, 196)
            .png()
            .toFile('./public/favicon.ico'),
        ...sizes.map(saveWithSize)
    ])

    manifest.icons = sizes.map((size) => ({
        src: `/icons/favicon-${size}x${size}.png`,
        sizes: `${size}x${size}`,
        type: 'image/png',
    }))
}

const saveManifest = async () => {
    fs.writeFileSync('./public/manifest.json', JSON.stringify(manifest, null, 4))
}

fs.writeFileSync('./.env', newEnv)

if (!fs.existsSync('./public/assets')) fs.mkdirSync('./public/assets')
if (!fs.existsSync('./assets/parsed')) fs.mkdirSync('./assets/parsed')

Promise.all([
    modifySvgColors('./assets/raw/og-image.svg', './public/assets/og-image.png'),

    modifySvgColors('./assets/raw/rboardThemeManager.svg', './assets/parsed/rboardThemeManager.svg', true),
    modifySvgColors('./assets/raw/rboardImeTester.svg', './assets/parsed/rboardImeTester.svg', true),
    modifySvgColors('./assets/raw/rboardThemeCreator.svg', './assets/parsed/rboardThemeCreator.svg', true),
    modifySvgColors('./assets/raw/rboardPatcher.svg', './assets/parsed/rboardPatcher.svg', true),
    modifySvgColors('./assets/raw/mixThemeCreator.svg', './assets/parsed/mixThemeCreator.svg', true),
    modifySvgColors('./assets/raw/ytmdRemote.svg', './assets/parsed/ytmdRemote.svg', true),

    createScaledFavicons()
]).then(saveManifest)

console.log(`Accent: ${accent.hex()}
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