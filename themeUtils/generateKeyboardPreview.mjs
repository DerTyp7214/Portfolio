import Color from 'color'
import fs from 'fs'
import puppeteer from 'puppeteer'

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

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    const page = await browser.newPage()
    await page.setContent(fs.readFileSync('./themeUtils/default.html', 'utf8'), { waitUntil: 'networkidle0' })
    page.on('console', async (msg) => {
        const msgArgs = msg.args()
        for (const arg of msgArgs) console.log(await arg.jsonValue())
    })
    await page.evaluate(query => {
        const {
            mainBg,
            keyBg,
            keyColor,
            secondKeyBg,
            accentBg
        } = query

        const root = document.documentElement

        if (mainBg) root.style.setProperty('--main-bg', mainBg)
        if (keyBg) root.style.setProperty('--key-bg', keyBg)
        if (keyColor) root.style.setProperty('--key-color', keyColor)
        if (secondKeyBg) root.style.setProperty('--second-key-bg', secondKeyBg)
        if (accentBg) root.style.setProperty('--accent-bg', accentBg)
    }, {
        mainBg: mainBg.hex(),
        keyBg: keyBg.hex(),
        keyColor: keyColor.hex(),
        secondKeyBg: secondKeyBg.hex(),
        accentBg: accentBg.hex()
    })
    await page.waitForSelector('.keyboard_body')
    const element = await page.$('.keyboard_body')
    const buffer = await element.screenshot()

    await page.close()
    await browser.close()
    return buffer
}