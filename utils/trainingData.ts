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
    ].map((color) => Color(color))

    return {
      input: { color: seed, l: colors[0].lightness() / 100 },
      output: colors,
    }
  }

  return Array.from({ length: 1 }, () => generateColors())
}

function monetTrainingData() {
  const monetSchemesGen1 = [
    {
      mainBackground: '#000000',
      accentBackground: '#EFD9DD',
      keyBackground: '#1F1A1E',
      secondaryKeyBackground: '#342C33',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#181D23',
      accentBackground: '#C4E8FF',
      keyBackground: '#2D3238',
      secondaryKeyBackground: '#43484E',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#231812',
      accentBackground: '#C3F18E',
      keyBackground: '#3B2E26',
      secondaryKeyBackground: '#51443C',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#141D1A',
      accentBackground: '#7EF7D4',
      keyBackground: '#2A322F',
      secondaryKeyBackground: '#3F4945',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#1B1C1E',
      accentBackground: '#D3E3FC',
      keyBackground: '#2F3034',
      secondaryKeyBackground: '#46474B',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#F5F2DD',
      accentBackground: '#EDD101',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#EFE4B1',
      keyColor: '#000000',
    },
    {
      mainBackground: '#FFEEE0',
      accentBackground: '#FFB964',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#FFDCC1',
      keyColor: '#000000',
    },
    {
      mainBackground: '#FBEEEA',
      accentBackground: '#FFB3AC',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#FFDAD7',
      keyColor: '#000000',
    },
    {
      mainBackground: '#F0F0FB',
      accentBackground: '#BAC3FF',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#E0E0FB',
      keyColor: '#000000',
    },
    {
      mainBackground: '#EDF1FC',
      accentBackground: '#A7C8FE',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#DCE2FA',
      keyColor: '#000000',
    },
    {
      mainBackground: '#EAF3EA',
      accentBackground: '#FFB4A8',
      tertiaryBackground: '#A5D0BA',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#C1ECD6',
      keyColor: '#000000',
    },
    {
      mainBackground: '#151D18',
      accentBackground: '#FFB4A8',
      tertiaryBackground: '#8AB49F',
      keyBackground: '#2A322D',
      secondaryKeyBackground: '#404943',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#1A1B23',
      accentBackground: '#BEF0A7',
      tertiaryBackground: '#CE9EB4',
      keyBackground: '#2F3038',
      secondaryKeyBackground: '#45464F',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#F1F0FA',
      accentBackground: '#A3D48D',
      tertiaryBackground: '#EBB8CF',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#FFD8E8',
      keyColor: '#000000',
    },
    {
      mainBackground: '#F3F0F1',
      accentBackground: '#C0C6D5',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#E0E2EC',
      keyColor: '#000000',
    },
    {
      mainBackground: '#1B1B1D',
      accentBackground: '#DCE2F2',
      keyBackground: '#303032',
      secondaryKeyBackground: '#474648',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#251916',
      accentBackground: '#D3E3FF',
      tertiaryBackground: '#D0A279',
      keyBackground: '#3B2D2A',
      secondaryKeyBackground: '#534340',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#FFEDE9',
      accentBackground: '#A3C9FF',
      tertiaryBackground: '#EEBD92',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#FFDCC0',
      keyColor: '#000000',
    },
    {
      mainBackground: '#E9F2F4',
      accentBackground: '#F9BB64',
      tertiaryBackground: '#C3C3EB',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#E1E0FF',
      keyColor: '#000000',
    },
    {
      mainBackground: '#141D1F',
      accentBackground: '#FFDDB4',
      tertiaryBackground: '#A8A8CE',
      keyBackground: '#293233',
      secondaryKeyBackground: '#3F484A',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#1C1A22',
      accentBackground: '#A6F3C2',
      tertiaryBackground: '#C1A1C3',
      keyBackground: '#312F38',
      secondaryKeyBackground: '#48454E',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#F4EEFA',
      accentBackground: '#8AD7A7',
      tertiaryBackground: '#DDBCE0',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#FBD7FC',
      keyColor: '#000000',
    },
    {
      mainBackground: '#F1F2E1',
      accentBackground: '#FFAFD7',
      tertiaryBackground: '#ABCFB0',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#C7ECCB',
      keyColor: '#000000',
    },
    {
      mainBackground: '#1A1D13',
      accentBackground: '#FFD8E9',
      tertiaryBackground: '#91B495',
      keyBackground: '#2F3127',
      secondaryKeyBackground: '#46483C',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#191C1E',
      accentBackground: '#C9E6FF',
      keyBackground: '#2E3133',
      secondaryKeyBackground: '#454749',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#F0F0F3',
      accentBackground: '#94CDF7',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#D3E5F5',
      keyColor: '#000000',
    },
    {
      mainBackground: '#F5F0E7',
      accentBackground: '#D4C871',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#EBE3BD',
      keyColor: '#000000',
    },
    {
      mainBackground: '#1D1C16',
      accentBackground: '#F1E48A',
      keyBackground: '#32302A',
      secondaryKeyBackground: '#494740',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#201A17',
      accentBackground: '#FFDBC8',
      keyBackground: '#362F2C',
      secondaryKeyBackground: '#4D4541',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#FBEEE9',
      accentBackground: '#FFB68B',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#FFDBC8',
      keyColor: '#000000',
    },
    {
      mainBackground: '#F9EEF1',
      accentBackground: '#FBB0D7',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#FCD9E9',
      keyColor: '#000000',
    },
    {
      mainBackground: '#1F1A1C',
      accentBackground: '#FFD8E9',
      keyBackground: '#352F31',
      secondaryKeyBackground: '#4C4547',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#191C1C',
      accentBackground: '#9CF1F1',
      keyBackground: '#2D3131',
      secondaryKeyBackground: '#444747',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#EFF1F0',
      accentBackground: '#80D4D5',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#CCE8E7',
      keyColor: '#000000',
    },
    {
      mainBackground: '#F3F0F4',
      accentBackground: '#BEC2FF',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#E1E0F9',
      keyColor: '#000000',
    },
    {
      mainBackground: '#1B1B1F',
      accentBackground: '#E0E0FF',
      keyBackground: '#303034',
      secondaryKeyBackground: '#47464A',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#201A19',
      accentBackground: '#FFDBD2',
      keyBackground: '#362F2D',
      secondaryKeyBackground: '#4D4543',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#FBEEEB',
      accentBackground: '#FFB4A1',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#FFDBD2',
      keyColor: '#000000',
    },
    {
      mainBackground: '#E6F3F8',
      accentBackground: '#36D7FF',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#C7E7FF',
      keyColor: '#000000',
    },
    {
      mainBackground: '#121D21',
      accentBackground: '#B3EBFF',
      keyBackground: '#273236',
      secondaryKeyBackground: '#3D494D',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#210007',
      accentBackground: '#FF1A1A',
      keyBackground: '#360610',
      secondaryKeyBackground: '#4D0F1A',
      keyColor: '#FFFFFF',
    },
    {
      mainBackground: '#FFE5E5',
      accentBackground: '#FF1919',
      tertiaryBackground: '#C61817',
      keyBackground: '#FFFFFF',
      secondaryKeyBackground: '#FFA3A3',
      keyColor: '#000000',
    },
  ]

  const monetSchemesGen2 = [
    {
      mainBackground: '#EEF2E4',
      accentBackground: '#FFB1C7',
      tertiaryBackground: '#A6D0B9',
      keyBackground: '#ffffff',
      secondaryKeyBackground: '#C1ECD4',
      keyColor: '#000000',
    },
    {
      mainBackground: '#141D1D',
      accentBackground: '#FFDCC4',
      tertiaryBackground: '#89B1C1',
      keyBackground: '#293231',
      secondaryKeyBackground: '#3F4948',
      keyColor: '#ffffff',
    },
    {
      mainBackground: '#E8F3F1',
      accentBackground: '#FFB77F',
      tertiaryBackground: '#A4CDDD',
      keyBackground: '#ffffff',
      secondaryKeyBackground: '#BFE9F9',
      keyColor: '#000000',
    },
    {
      mainBackground: '#1E1A22',
      accentBackground: '#97F4D8',
      tertiaryBackground: '#97F4D8',
      keyBackground: '#342F37',
      secondaryKeyBackground: '#4A454E',
      keyColor: '#ffffff',
    },
    {
      mainBackground: '#F7EEF9',
      accentBackground: '#7BD7BC',
      tertiaryBackground: '#E7B9D6',
      keyBackground: '#ffffff',
      secondaryKeyBackground: '#FFD7EF',
      keyColor: '#000000',
    },
    {
      mainBackground: '#FFECF1',
      accentBackground: '#79D3EE',
      tertiaryBackground: '#F5B7B0',
      keyBackground: '#ffffff',
      secondaryKeyBackground: '#FFDAD6',
      keyColor: '#000000',
    },
    {
      mainBackground: '#FCEDF6',
      accentBackground: '#72D6D7',
      tertiaryBackground: '#F1B7C5',
      keyBackground: '#ffffff',
      secondaryKeyBackground: '#FFD9E1',
      keyColor: '#000000',
    },
    {
      mainBackground: '#211920',
      accentBackground: '#8FF3F4',
      tertiaryBackground: '#D39DA9',
      keyBackground: '#372E35',
      secondaryKeyBackground: '#4E444B',
      keyColor: '#ffffff',
    },
    {
      mainBackground: '#FAEFDD',
      accentBackground: '#E2B6FC',
      tertiaryBackground: '#C3CB97',
      keyBackground: '#ffffff',
      secondaryKeyBackground: '#DFE7B2',
      keyColor: '#000000',
    },
    {
      mainBackground: '#201B10',
      accentBackground: '#F3DAFF',
      tertiaryBackground: '#A8B07E',
      keyBackground: '#353024',
      secondaryKeyBackground: '#4C4639',
      keyColor: '#ffffff',
    },
    {
      mainBackground: '#23191C',
      accentBackground: '#B1ECFF',
      tertiaryBackground: '#D79D96',
      keyBackground: '#392D31',
      secondaryKeyBackground: '#514348',
      keyColor: '#ffffff',
    },
    {
      mainBackground: '#EEF0FA',
      accentBackground: '#B9D079',
      tertiaryBackground: '#E3BADA',
      keyBackground: '#ffffff',
      secondaryKeyBackground: '#FFD7F6',
      keyColor: '#000000',
    },
    {
      mainBackground: '#FFEDE8',
      accentBackground: '#A8C8FF',
      tertiaryBackground: '#C7CA95',
      keyBackground: '#ffffff',
      secondaryKeyBackground: '#E3E7AF',
      keyColor: '#000000',
    },
    {
      mainBackground: '#251915',
      accentBackground: '#D5E3FF',
      tertiaryBackground: '#ABAF7C',
      keyBackground: '#3B2D29',
      secondaryKeyBackground: '#53433F',
      keyColor: '#ffffff',
    },
  ]

  return [...monetSchemesGen1, ...monetSchemesGen2].map((scheme) => {
    const colors = [
      scheme.mainBackground,
      scheme.keyBackground,
      scheme.secondaryKeyBackground,
      scheme.keyColor,
      scheme.accentBackground,
      scheme.tertiaryBackground ?? scheme.accentBackground,
    ].map((color) => Color(color))
    return {
      input: {
        color: colors[colors.length - 1],
        l: colors[0].isLight() ? 1 : 0,
      },
      output: colors,
    }
  })
}

export { randomTrainingData, monetTrainingData }

