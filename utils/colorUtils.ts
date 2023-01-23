import ColorLib from 'color'
import Vibrant from 'node-vibrant'
import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from 'node-vibrant/lib/util'
import { Color, HSLColor, RGBColor } from 'react-color'
import { KeyboardColors } from '../types/types'

export function lerpColor(a: string, b: string, amount: number): string {
  var ah = +a.replace('#', '0x'),
    ar = ah >> 16,
    ag = (ah >> 8) & 0xff,
    ab = ah & 0xff,
    bh = +b.replace('#', '0x'),
    br = bh >> 16,
    bg = (bh >> 8) & 0xff,
    bb = bh & 0xff,
    rr = ar + amount * (br - ar),
    rg = ag + amount * (bg - ag),
    rb = ab + amount * (bb - ab)

  return (
    '#' + (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1)
  )
}

export function numberToHex(number: number): string {
  const n = number.toString(16)

  return n.length === 1 ? '0' + n : n
}

export function rgbStringToHex(rgb: string): string {
  if (!rgb.startsWith('rgb')) return rgb

  const [r, g, b] = rgb
    .replace('rgb(', '')
    .replace(')', '')
    .split(',')
    .map((n) => parseInt(n))

  return `#${numberToHex(r)}${numberToHex(g)}${numberToHex(b)}`.toUpperCase()
}

export function getBackgroundColor(id: string): string {
  const element = document.getElementById(id)

  if (!element) {
    return ''
  }

  const style = window.getComputedStyle(element)

  return style.backgroundColor
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export const toHex = (color?: Color) => {
  if (!color) return ''
  switch (typeof color) {
    case 'string':
      return color
    case 'object':
      let r = 0,
        g = 0,
        b = 0
      if (Object.hasOwnProperty.call(color, 'r')) {
        const { r: red, g: green, b: blue } = color as RGBColor
        r = red
        g = green
        b = blue
      } else if (Object.hasOwnProperty.call(color, 'h')) {
        const { h, s, l } = color as HSLColor
        const [red, green, blue] = hslToRgb(h, s, l)
        r = red
        g = green
        b = blue
      }
      return rgbToHex(r, g, b)
    default:
      return ''
  }
}

export const toHSL = (color?: Color) => {
  if (!color) return { h: 0, s: 0, l: 0 }
  switch (typeof color) {
    case 'string':
      const [r, g, b] = hexToRgb(color) ?? [0, 0, 0]
      const [h, s, l] = rgbToHsl(r, g, b)
      return { h, s, l }
    case 'object':
      if (Object.hasOwnProperty.call(color, 'r')) {
        const { r, g, b } = color as RGBColor
        const [h, s, l] = rgbToHsl(r, g, b)
        return { h, s, l }
      } else if (Object.hasOwnProperty.call(color, 'h')) {
        const { h, s, l } = color as HSLColor
        return { h, s, l }
      }
      return { h: 0, s: 0, l: 0 }
    default:
      return { h: 0, s: 0, l: 0 }
  }
}

export const toRGB = (color?: Color) => {
  if (!color) return { r: 0, g: 0, b: 0 }
  switch (typeof color) {
    case 'string':
      const [r, g, b] = hexToRgb(color) ?? [0, 0, 0]
      return { r, g, b }
    case 'object':
      if (Object.hasOwnProperty.call(color, 'r')) {
        const { r, g, b } = color as RGBColor
        return { r, g, b }
      } else if (Object.hasOwnProperty.call(color, 'h')) {
        const { h, s, l } = color as HSLColor
        const [r, g, b] = hslToRgb(h, s, l)
        return { r, g, b }
      }
      return { r: 0, g: 0, b: 0 }
    default:
      return { r: 0, g: 0, b: 0 }
  }
}

export function generateRandomKeyboardTheme(
  light: boolean = false,
  options?: {
    seed?: string
    backgroundSeed?: string
    keyBackgroundSeed?: string
  }
): KeyboardColors {
  const { seed, backgroundSeed, keyBackgroundSeed } = options ?? {}

  const randomColor = seed
    ? ColorLib(seed)
    : ColorLib.rgb(
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
      )

  const white = ColorLib('#ffffff')
  const black = ColorLib('#000000')

  const randomDesaturation = Math.random() * 0.5 + 0.5

  const accentBg = randomColor
    .saturate(1.1)
    .mix(light ? black : white)
    .lightness(light ? 30 : 70)
  const mainBg = backgroundSeed
    ? ColorLib(backgroundSeed)
    : randomColor
        .lightness(light ? 60 : 40)
        .rotate(120)
        .desaturate(randomDesaturation)
        .mix(light ? white : black)

  const keyBg = keyBackgroundSeed
    ? ColorLib(keyBackgroundSeed)
    : light
    ? mainBg.darken(0.2)
    : mainBg.lighten(0.2)
  const secondKeyBg = light ? keyBg.darken(0.2) : keyBg.lighten(0.2)

  return {
    mainBackground: mainBg.hex(),
    keyBackground: keyBg.hex(),
    keyColor: light ? '#000000' : '#ffffff',
    secondaryKeyBackground: secondKeyBg.hex(),
    accentBackground: accentBg.hex(),
    themeName: 'Rboard Theme',
    author: 'DerTyp7214',
    preset: 'default',
  }
}

export function lighnessGrades(color?: Color): string[] {
  const colorLib = ColorLib(toHex(color))
  const grades = []

  for (let i = 0.2; i <= 1; i += 0.2) {
    const grade = colorLib.lighten(i)
    if (grade.lightness() > 0.98) grades.push(colorLib.darken(i * 0.7))
    else grades.push(grade)
  }

  return grades
    .sort((a, b) => a.lightness() - b.lightness())
    .map((c) => c.hex())
}

export function matchingColors(color?: Color): string[] {
  if (!color) return []
  let colorLib = ColorLib(toHex(color))

  const white = ColorLib('#ffffff')
  const black = ColorLib('#000000')

  const accent = colorLib.saturate(1.1).mix(white).lighten(0.1)
  const desaturatedAccent = accent.desaturate(0.5)
  const tertiary = accent.rotate(180)
  const desaturatedTertiary = tertiary.desaturate(0.5)
  const background = colorLib.rotate(120).desaturate(0.95).mix(black)
  const secondaryBackground = background.lighten(0.3)

  return [
    accent,
    desaturatedAccent,
    tertiary,
    desaturatedTertiary,
    background,
    secondaryBackground,
    colorLib,
  ].map((c) => c.hex())
}

export async function getColorsFromPicture(
  light: boolean = false,
  options?: {
    colorFull?: boolean
  }
): Promise<KeyboardColors> {
  const { colorFull } = options ?? {}

  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/png, image/jpeg'

  const randomColor: () => string = () => {
    const color = `#${((Math.random() * 0xffffff) << 0).toString(16)}`
    return color.length === 7 ? color : randomColor()
  }

  return new Promise((resolve) => {
    input.onchange = () => {
      const file = input.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = async (e) => {
          const base64 = e.target?.result?.toString()
          if (base64) {
            const palette = await Vibrant.from(base64).getPalette()

            const mainBg = light
              ? palette.LightMuted?.hex
              : palette.DarkMuted?.hex
            const accentBg = palette.Vibrant?.hex
            const keyBg = light
              ? palette.LightVibrant?.hex
              : palette.DarkVibrant?.hex

            resolve({
              ...generateRandomKeyboardTheme(light, {
                seed: accentBg,
                backgroundSeed: mainBg,
                keyBackgroundSeed: colorFull ? keyBg : undefined,
              }),
              themeName: file.name.split('.').slice(0, -1).join('.'),
              author: 'DerTyp7214',
            })
          }
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  })
}
