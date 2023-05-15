import Color from 'color'
import fs from 'fs'

export const generatePreview = async (bg, accent, colors) => {
    let mainBg = Color(bg)
    let accentBg = Color(accent)
    let keyBg = mainBg.lighten(0.2)
    let secondKeyBg = mainBg.lighten(0.4)
    let keyColor = Color('#ffffff')

    if (colors) {
        mainBg = Color(mainBackground)
        keyBg = Color(keyBackground)
        keyColor = Color(keyColor)
        secondKeyBg = Color(secondaryKeyBackground)
        accentBg = Color(accentBackground)
    }

    const svg = fs.readFileSync('./themeUtils/default.svg', 'utf8')
        .replace(/var\(--main-bg\)/g, mainBg.hex())
        .replace(/var\(--key-bg\)/g, keyBg.hex())
        .replace(/var\(--key-color\)/g, keyColor.hex())
        .replace(/var\(--second-key-bg\)/g, secondKeyBg.hex())
        .replace(/var\(--accent-bg\)/g, accentBg.hex())

    return Buffer.from(svg)
}