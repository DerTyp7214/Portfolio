const Color = require('color')
const fs = require('fs')

const randomColor = Color.rgb(
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255)
)

const accent = randomColor.saturate(1.1).mix(Color.rgb(255, 255, 255)).lightness(70)
const tertiary = accent.rotate(180)
const background = randomColor.lightness(40).rotate(120).desaturate(.97).mix(Color.rgb(0, 0, 0))
const secondaryBackground = background.lighten(.3)

// create new env with new colors
const newEnv = `NEXT_PUBLIC_COLOR_ACCENT=${accent.hex()}
NEXT_PUBLIC_COLOR_TERTIARY=${tertiary.hex()}
NEXT_PUBLIC_COLOR_BACKGROUND=${background.hex()}
NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND=${secondaryBackground.hex()}
`

// write new env to .env
fs.writeFileSync('./.env', newEnv)
