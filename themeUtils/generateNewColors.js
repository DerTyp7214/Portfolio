const Color = require('color')
const fs = require('fs')
const sharp = require('sharp')

const randomColor = Color.rgb(
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
)

const accentDark = randomColor.saturate(1.1).mix(Color.rgb(255, 255, 255)).lightness(70)
const accent = accentDark.negate().rotate(180)
const desaturatedAccentDark = accentDark.desaturate(.5)
const desaturatedAccent = desaturatedAccentDark.negate().rotate(180)
const tertiaryDark = accentDark.rotate(180)
const tertiary = tertiaryDark.negate().rotate(180)
const backgroundDark = randomColor.lightness(40).rotate(120).desaturate(.95).mix(Color.rgb(0, 0, 0))
const secondaryBackgroundDark = backgroundDark.lighten(.3)
const background = backgroundDark.negate().rotate(180)
const secondaryBackground = secondaryBackgroundDark.negate().rotate(180)

// create new env with new colors
const newEnv = `NEXT_PUBLIC_COLOR_ACCENT=${accent.hex()}
NEXT_PUBLIC_COLOR_ACCENT_DARK=${accentDark.hex()}
NEXT_PUBLIC_COLOR_DESATURATED_ACCENT=${desaturatedAccent.hex()}
NEXT_PUBLIC_COLOR_DESATURATED_ACCENT_DARK=${desaturatedAccentDark.hex()}
NEXT_PUBLIC_COLOR_TERTIARY=${tertiary.hex()}
NEXT_PUBLIC_COLOR_TERTIARY_DARK=${tertiaryDark.hex()}
NEXT_PUBLIC_COLOR_BACKGROUND_DARK=${backgroundDark.hex()}
NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND_DARK=${secondaryBackgroundDark.hex()}
NEXT_PUBLIC_COLOR_BACKGROUND=${background.hex()}
NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND=${secondaryBackground.hex()}
`

const modifySvgColors = async () => {
    const svg = fs.readFileSync('./public/assets/og-image.svg', 'utf8')
    const newSvg = svg
        .replace(/%accent%/g, accentDark.hex())
        .replace(/%desaturated_accent%/g, desaturatedAccentDark.hex())
        .replace(/%tertiary%/g, tertiaryDark.hex())
        .replace(/%background%/g, backgroundDark.hex())
        .replace(/%secondary_background%/g, secondaryBackgroundDark.hex())

    await sharp(Buffer.from(newSvg))
        .png()
        .toFile('./public/assets/og-image.png')
}

// write new env to .env
fs.writeFileSync('./.env', newEnv)

modifySvgColors()