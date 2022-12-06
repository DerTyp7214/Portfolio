const Color = require('color')
const fs = require('fs')
const sharp = require('sharp')

const randomColor = Color.rgb(
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
)

const accent = randomColor.saturate(1.1).mix(Color.rgb(255, 255, 255)).lightness(70)
const desaturatedAccent = accent.desaturate(.5)
const tertiary = accent.rotate(180)
const background = randomColor.lightness(40).rotate(120).desaturate(.95).mix(Color.rgb(0, 0, 0))
const secondaryBackground = background.lighten(.3)

// create new env with new colors
const newEnv = `NEXT_PUBLIC_COLOR_ACCENT=${accent.hex()}
NEXT_PUBLIC_COLOR_DESATURATED_ACCENT=${desaturatedAccent.hex()}
NEXT_PUBLIC_COLOR_TERTIARY=${tertiary.hex()}
NEXT_PUBLIC_COLOR_BACKGROUND=${background.hex()}
NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND=${secondaryBackground.hex()}
`

const modifySvgColors = async () => {
    const svg = fs.readFileSync('./public/og-image.svg', 'utf8')
    const newSvg = svg
        .replace(/%accent%/g, accent.hex())
        .replace(/%desaturated_accent%/g, desaturatedAccent.hex())
        .replace(/%tertiary%/g, tertiary.hex())
        .replace(/%background%/g, background.hex())
        .replace(/%secondary_background%/g, secondaryBackground.hex())

    await sharp(Buffer.from(newSvg))
        .png()
        .toFile('./public/og-image.png')
}

// write new env to .env
fs.writeFileSync('./.env', newEnv)

modifySvgColors()