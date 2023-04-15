import { HomeIcon } from '@heroicons/react/24/outline'
import Color from 'color'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next/types'
import { useEffect, useState } from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import BaseHeader from '../../components/BaseHeader'
import Keyboard from '../../components/Keyboard'
import KeyboardSettings from '../../components/KeyboardSettings'
import RenderOnMount from '../../components/RenderOnMount'
import { useAppContext } from '../../components/appContext'
import {
  KeyboardColors,
  KeyboardTheme,
  PageInfo,
  ThemePreset,
} from '../../types/types'
import { lerpColor } from '../../utils/colorUtils'
import { ParseLocation } from '../../utils/customRouteHandler'
import fetchPageInfo from '../../utils/fetchPageInfo'
import fetchThemePresets from '../../utils/fetchThemePresets'

type Props = {
  themePresets: ThemePreset[]
}

const getConsts = (query: { [key: string]: string }) =>
  query['mainBg'] &&
  query['keyBg'] &&
  query['keyColor'] &&
  query['secondKeyBg'] &&
  query['accentBg']
    ? {
        mainBg: `#${query['mainBg']}`,
        keyBg: `#${query['keyBg']}`,
        keyColor: `#${query['keyColor']}`,
        secondKeyBg: `#${query['secondKeyBg']}`,
        accentBg: `#${query['accentBg']}`,
        tertiaryBg: `#${query['tertiaryBg'] ?? query['accentBg']}`,
        themeName: query['themeName'] ?? 'Rboard Theme',
        author: query['author'] ?? 'DerTyp7214',
        preset: query['preset'] ?? 'default',
      }
    : (() => {
        const mainBg = Color(process.env.NEXT_PUBLIC_COLOR_BACKGROUND_DARK)
        const accentBg = Color(process.env.NEXT_PUBLIC_COLOR_ACCENT_DARK)
        const keyBg = mainBg.lighten(0.2)
        const secondKeyBg = mainBg.lighten(0.4)
        return {
          mainBg: mainBg.hex(),
          keyBg: keyBg.hex(),
          keyColor: '#ffffff',
          secondKeyBg: secondKeyBg.hex(),
          accentBg: accentBg.hex(),
          tertiaryBg: accentBg.rotate(180).hex(),
          themeName: 'Rboard Theme',
          author: 'DerTyp7214',
          preset: 'default',
        }
      })()

function Rboard({ themePresets }: Props) {
  const { darkMode } = useAppContext()
  const router = useRouter()
  const query = router.query as { [key: string]: string }

  const consts = getConsts(query)

  const [keyboardTheme, setKeyboardTheme] = useState<KeyboardTheme>({
    author: consts.author,
    themeName: consts.themeName,
    preset: consts.preset as any,
    mainBackground: consts.mainBg,
    keyBackground: consts.keyBg,
    keyColor: consts.keyColor,
    keyBorderRadius: 0.2,
    secondaryKeyBackground: consts.secondKeyBg,
    accentBackground: consts.accentBg,
    tertiaryBackground: consts.tertiaryBg,
    fontSize: 'min(4vw, 4vh)',
  })

  const { preset } = keyboardTheme

  useEffect(() => {
    const consts = getConsts(query)
    setKeyboardTheme({
      author: consts.author,
      themeName: consts.themeName,
      preset: consts.preset as any,
      mainBackground: consts.mainBg,
      keyBackground: consts.keyBg,
      keyColor: consts.keyColor,
      keyBorderRadius: 0.2,
      secondaryKeyBackground: consts.secondKeyBg,
      accentBackground: consts.accentBg,
      tertiaryBackground: consts.tertiaryBg,
      fontSize: 'min(4vw, 4vh)',
    })
  }, [query])

  const randomColor: () => string = () => {
    const color = `#${((Math.random() * 0xffffff) << 0).toString(16)}`
    return color.length === 7 ? color : randomColor()
  }

  const setColors = (colors: KeyboardColors) => {
    setKeyboardTheme({
      ...keyboardTheme,
      ...colors,
    })
  }

  const setPreset = (preset: string) => {
    setKeyboardTheme({
      ...keyboardTheme,
      preset,
    })
  }

  const getPreset = (preset: string) => {
    return themePresets.find((presetObj) => presetObj.name === preset)
  }

  useEffect(() => {
    const presetObj = themePresets.find(
      (presetObj) => presetObj.name === preset
    )
    if (presetObj) {
    }
  }, [preset, themePresets])

  return (
    <>
      <BaseHeader
        leftContent={
          <Link href={ParseLocation('/')}>
            <HomeIcon className='w-12 h-12 p-[7px] cursor-pointer opacity-50 dark:opacity-60 hover:scale-125 hover:opacity-100 dark:hover:opacity-100 transition-all duration-200' />
          </Link>
        }
      />

      <div className='flex flex-col items-center justify-center w-full'>
        <RenderOnMount>
          <div className='inline-flex flex-col-reverse xl:flex-row items-end xl:items-start justify-evenly m-5'>
            <KeyboardSettings
              colors={keyboardTheme}
              presets={themePresets}
              onColorsChanged={(colors: KeyboardColors) => {
                setColors(colors)
              }}
              onPresetChanged={(preset: string) => {
                setPreset(preset)
              }}
            />
            <Keyboard
              theme={keyboardTheme}
              preview={getPreset(keyboardTheme.preset)?.preview}
            />
          </div>
          <ReactTooltip
            style={{
              backgroundColor: lerpColor(
                (darkMode
                  ? process.env.NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND_DARK
                  : process.env.NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND) ??
                  '#434d57',
                darkMode ? '#FFFFFF' : '#000000',
                0.1
              ),
              color: darkMode ? '#FFFFFF' : '#000000',
            }}
            className='max-w-[200px] text-center'
          />
        </RenderOnMount>
      </div>
    </>
  )
}

export default Rboard

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await fetchPageInfo('creator')
  const themePresets: ThemePreset[] = await fetchThemePresets()

  return {
    props: {
      pageInfo,
      themePresets,
    },
  }
}
