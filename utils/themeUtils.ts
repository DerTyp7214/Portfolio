import Color from 'color'
import { saveAs } from 'file-saver'
import html2canvas from 'html2canvas'
import JSZip from 'jszip'
import { name } from 'ntc'
import { KeyboardColors, ThemeMetadata, ThemePreset } from '../types/types'

export const getTheme = async (
  preset: ThemePreset,
  keyboardElement?: HTMLElement | null,
  colors?: KeyboardColors
) => {
  if (!keyboardElement) return
  if (!colors) return

  const metadata = generateMetadata({
    ...preset.metadata,
    is_light_theme: Color(colors.mainBackground).isLight(),
  })

  const {
    mainBackground,
    keyBackground,
    keyColor,
    secondaryKeyBackground,
    accentBackground,
    tertiaryBackground,
    themeName,
    author,
  } = Object.assign(
    {
      themeName: metadata.id ?? 'Theme',
      author: 'DerTyp7214',
      preset: 'default',
    },
    colors
  )

  const escapedThemeName = themeName.replace(new RegExp(' ', 'g'), '_')

  const png = new Promise<string>(async (resolve) => {
    const canvas = await html2canvas(keyboardElement, {
      backgroundColor: mainBackground,
    })
    resolve(
      canvas.toDataURL('image/png').replace(/^data:image\/png;base64,/, '')
    )
  })

  const variables = [
    `@def web_color_bg ${mainBackground};`,
    `@def web_color_label ${keyColor};`,
    `@def web_color_accent ${accentBackground};`,
    `@def web_color_accent_pressed ${shadeColor(`${accentBackground}`, 5)};`,
    `@def web_color_tertiary_key_bg ${tertiaryBackground};`,
    `@def web_color_tertiary_key_bg_pressed ${shadeColor(
      `${tertiaryBackground}`,
      5
    )};`,
    `@def web_color_key_bg ${keyBackground};`,
    `@def web_color_key_bg_pressed ${secondaryKeyBackground};`,
    `@def web_color_secondary_key_bg ${secondaryKeyBackground};`,
    `@def web_color_secondary_key_bg_pressed ${shadeColor(
      `${secondaryKeyBackground}`,
      5
    )};`,
  ]

  const themeZip = new JSZip()

  themeZip.file('metadata.json', JSON.stringify(metadata, null, 2))
  themeZip.file('style_sheet_md2.css', preset.styleSheetMd)
  themeZip.file('style_sheet_md2_border.css', preset.styleSheetMdBorder)
  themeZip.file('variables.css', variables.join('\n'))

  preset.imageBase64.forEach((image, index) => {
    themeZip.file(
      image.file,
      image.base64.replace(/^data:image\/png;base64,/, ''),
      { base64: true }
    )
  })

  const packZip = new JSZip()

  const tags = [
    name(`${mainBackground}`),
    name(`${keyBackground}`),
    name(`${keyColor}`),
    name(`${secondaryKeyBackground}`),
    name(`${accentBackground}`),
    name(`${tertiaryBackground}`),
  ]
    .filter((tag) => tag !== null)
    .map((tag) => tag![1])

  packZip.file(
    'pack.meta',
    `name=${themeName}\nauthor=${author}\n${
      tags.length > 0 ? `tags=${tags.join(',')}` : ''
    }`
  )
  packZip.file(
    `${escapedThemeName}.zip`,
    await themeZip.generateAsync({ type: 'base64' }),
    { base64: true }
  )
  packZip.file(escapedThemeName, png, { base64: true })

  const content = await packZip.generateAsync({ type: 'blob' })

  saveAs(content, `${escapedThemeName}.pack`)
}

const shadeColor = (color: string, percent: number): string => {
  let R = parseInt(color.substring(1, 3), 16)
  let G = parseInt(color.substring(3, 5), 16)
  let B = parseInt(color.substring(5, 7), 16)

  R = parseInt(String((R * (100 + percent)) / 100))
  G = parseInt(String((G * (100 + percent)) / 100))
  B = parseInt(String((B * (100 + percent)) / 100))

  R = R < 255 ? R : 255
  G = G < 255 ? G : 255
  B = B < 255 ? B : 255

  const RR = R.toString(16).length === 1 ? '0' + R.toString(16) : R.toString(16)
  const GG = G.toString(16).length === 1 ? '0' + G.toString(16) : G.toString(16)
  const BB = B.toString(16).length === 1 ? '0' + B.toString(16) : B.toString(16)

  return '#' + RR + GG + BB
}

const generateMetadata = (override: ThemeMetadata = {}): ThemeMetadata => {
  return {
    format_version: 3,
    id: `web_${Date.now()}`,
    name: 'Rboard Web Theme Creator',
    prefer_key_border: true,
    lock_key_border: false,
    is_light_theme: false,
    ...override,
    style_sheets: [
      'variables.css',
      'style_sheet_md2.css',
      ...(override.style_sheets ?? []),
    ],
    flavors: [
      {
        type: 'BORDER',
        style_sheets: ['style_sheet_md2_border.css'],
      },
      ...(override.flavors ?? []),
    ],
  }
}
