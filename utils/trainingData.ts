import Color from 'color'
import { generateRandomKeyboardTheme } from './colorUtils'

function randomTrainingData() {
  const generateColors = () => {
    const dark = Math.random() > 0.5

    const seed = Color.rgb(
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255)
    ).lightness(!dark ? 30 : 70)

    const theme = generateRandomKeyboardTheme(!dark, {
      seed: seed.hex(),
    })
    const colors = [
      theme.mainBackground,
      theme.keyBackground,
      theme.secondaryKeyBackground,
      theme.keyColor,
      theme.accentBackground,
    ]

    return {
      input: { color: seed, dark },
      output: colors.map((color) => Color(color)),
    }
  }

  return Array.from({ length: 1 }, () => generateColors())
}

function monetTrainingData() {
  const monetSchemes = [
    {
      mainBackground: '#000000',
      accentBackground: '#EFD9DD',
      keyBackground: '#1F1A1E',
      secondaryKeyBackground: '#342C33',
      keyColor: '#FFFFFF',
      dark: true,
    },
    {
      mainBackground: '#181D23',
      accentBackground: '#C4E8FF',
      keyBackground: '#2D3238',
      secondaryKeyBackground: '#43484E',
      keyColor: '#FFFFFF',
      dark: true,
    },
    {
      mainBackground: '#231812',
      accentBackground: '#C3F18E',
      keyBackground: '#3B2E26',
      secondaryKeyBackground: '#51443C',
      keyColor: '#FFFFFF',
      dark: true,
    },
    {
      mainBackground: '#141D1A',
      accentBackground: '#7EF7D4',
      keyBackground: '#2A322F',
      secondaryKeyBackground: '#3F4945',
      keyColor: '#FFFFFF',
      dark: true,
    },
    {
      mainBackground: '#1B1C1E',
      accentBackground: '#D3E3FC',
      keyBackground: '#2F3034',
      secondaryKeyBackground: '#46474B',
      keyColor: '#FFFFFF',
      dark: true,
    },
    {
      mainBackground: '#F5F2DD',
      accentBackground: '#EDD101',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#EFE4B1',
      keyColor: '#000000',
      dark: false,
    },
    {
      mainBackground: '#FFEEE0',
      accentBackground: '#FFB964',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#FFDCC1',
      keyColor: '#000000',
      dark: false,
    },
    {
      mainBackground: '#FBEEEA',
      accentBackground: '#FFB3AC',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#FFDAD7',
      keyColor: '#000000',
      dark: false,
    },
    {
      mainBackground: '#F0F0FB',
      accentBackground: '#BAC3FF',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#E0E0FB',
      keyColor: '#000000',
      dark: false,
    },
    {
      mainBackground: '#EDF1FC',
      accentBackground: '#A7C8FE',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#DCE2FA',
      keyColor: '#000000',
      dark: false,
    },
  ]

  return monetSchemes.map((scheme) => {
    const colors = [
      scheme.mainBackground,
      scheme.keyBackground,
      scheme.secondaryKeyBackground,
      scheme.keyColor,
      scheme.accentBackground,
    ].map((color) => Color(color))

    return {
      input: { color: colors[colors.length - 1], dark: scheme.dark },
      output: colors,
    }
  })
}

export { randomTrainingData, monetTrainingData }

