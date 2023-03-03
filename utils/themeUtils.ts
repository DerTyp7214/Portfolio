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

  console.log(preset)

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

  const pressedColor = (hex?: string) => {
    const color = Color(hex)
    if (color.isLight()) return color.darken(0.2).hex()
    else return color.lighten(0.2).hex()
  }

  const variables = [
    `@def web_color_bg ${mainBackground};`,
    `@def web_color_label ${keyColor};`,
    `@def web_color_accent ${accentBackground};`,
    `@def web_color_accent_pressed ${pressedColor(accentBackground)};`,
    `@def web_color_tertiary_key_bg ${tertiaryBackground};`,
    `@def web_color_tertiary_key_bg_pressed ${pressedColor(
      tertiaryBackground
    )};`,
    `@def web_color_key_bg ${keyBackground};`,
    `@def web_color_key_bg_pressed ${secondaryKeyBackground};`,
    `@def web_color_secondary_key_bg ${secondaryKeyBackground};`,
    `@def web_color_secondary_key_bg_pressed ${pressedColor(
      secondaryKeyBackground
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
