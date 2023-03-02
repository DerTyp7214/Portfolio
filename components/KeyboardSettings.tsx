import { Button, Checkbox, Dropdown, Input, Spacer } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { KeyboardColors, ThemePreset } from '../types/types'
import {
  generateRandomKeyboardTheme,
  getColorsFromPicture,
  toHex
} from '../utils/colorUtils'
import { getTheme } from '../utils/themeUtils'
import { useAppContext } from './appContext'
import Picker from './Picker'

type Props = {
  colors: KeyboardColors
  presets: ThemePreset[]
  onColorsChanged: (colors: KeyboardColors) => void
  onPresetChanged: (preset: string) => void
}

const colorVars: (keyof KeyboardColors)[] = [
  'mainBackground',
  'keyBackground',
  'keyColor',
  'secondaryKeyBackground',
  'accentBackground',
  'tertiaryBackground',
]

const nameMapping: {
  [key in keyof KeyboardColors]: string
} = {
  mainBackground: 'Main Background',
  keyBackground: 'Key Background',
  keyColor: 'Key Color',
  secondaryKeyBackground: 'Secondary Key Background',
  accentBackground: 'Accent Background',
  tertiaryBackground: 'Tertiary Background',
}

const buildUrl = (path: string = '', colors: KeyboardColors): string => {
  let url = `${window.location.origin}/${path}`
  url += `?mainBg=${colors.mainBackground?.substring(1)}`
  url += `&keyBg=${colors.keyBackground?.substring(1)}`
  url += `&keyColor=${colors.keyColor?.substring(1)}`
  url += `&secondKeyBg=${colors.secondaryKeyBackground?.substring(1)}`
  url += `&accentBg=${colors.accentBackground?.substring(1)}`
  url += `&tertiaryBg=${colors.tertiaryBackground?.substring(1)}`
  url += `&themeName=${encodeURIComponent(colors.themeName ?? 'Rboard Theme')}`
  url += `&author=${encodeURIComponent(colors.author ?? 'Web-Creator')}`
  url += `&preset=${colors.preset ?? 'default'}`
  return url
}

const KeyboardSettings = ({
  colors,
  presets,
  onColorsChanged,
  onPresetChanged,
}: Props) => {
  const { darkMode } = useAppContext()
  const [lightTheme, setLightTheme] = useState(!darkMode)
  const [colorFul, setColorFul] = useState(false)
  const [preset, setPreset] = useState<ThemePreset>({
    name: 'default',
    styleSheetMd: '',
    styleSheetMdBorder: '',
    preview: '',
    metadata: {},
    imageBase64: [],
  })

  useEffect(() => {
    onPresetChanged(preset.name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset])

  useEffect(() => {
    setLightTheme(!darkMode)
    const theme = generateRandomKeyboardTheme(!darkMode, {
      seed: process.env.NEXT_PUBLIC_COLOR_SEED,
      backgroundSeed: darkMode
        ? process.env.NEXT_PUBLIC_COLOR_BACKGROUND_DARK
        : process.env.NEXT_PUBLIC_COLOR_BACKGROUND,
      presets: [colors.preset ?? 'default'],
    })
    onColorsChanged(theme)
    if (preset.name !== theme.preset)
      setPreset(presets.find((preset) => preset.name === theme.preset)!)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode])

  return (
    <div className='inline-flex w-full xl:w-auto flex-col items-end'>
      {colorVars.map((colorVar, index) => (
        <div key={index} className='flex items-center'>
          <span className='text-black dark:text-white'>
            {nameMapping[colorVar]}
          </span>
          <Picker
            colorVar={colors[colorVar]}
            submitColor={(color) => {
              onColorsChanged({
                ...colors,
                [colorVar]: toHex(color),
              })
            }}
          />
        </div>
      ))}
      <div className='flex flex-col items-center w-full mt-4'>
        <Spacer y={1.6} />
        <Input
          bordered
          labelPlaceholder='Author'
          value={colors.author}
          color='primary'
          css={{
            width: 'calc(100% - 2rem)',
          }}
          onChange={(e) => {
            onColorsChanged({
              ...colors,
              author: e.target.value,
            })
          }}
        />
        <Spacer y={1.6} />
        <Input
          bordered
          labelPlaceholder='Theme Name'
          color='primary'
          value={colors.themeName}
          css={{
            width: 'calc(100% - 2rem)',
          }}
          onChange={(e) => {
            onColorsChanged({
              ...colors,
              themeName: e.target.value,
            })
          }}
        />
        <Spacer y={0.6} />
        <Dropdown>
          <Dropdown.Button
            light={!darkMode}
            css={{
              width: 'calc(100% - 2rem)',
              color: darkMode ? 'black' : 'black',
            }}>
            Preset ({preset.name})
          </Dropdown.Button>
          <Dropdown.Menu
            onAction={(preset) => {
              setPreset(presets.find((p) => p.name === preset)!)
            }}>
            {presets.map((preset) => (
              <Dropdown.Item key={preset.name}>{preset.name}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Spacer y={0.6} />
        <style global>{`
          .nextui-icon-check .nextui-icon-check-line1::after {
            background: ${darkMode ? 'black' : 'white'};
          }
          .nextui-icon-check .nextui-icon-check-line2::after {
            background: ${darkMode ? 'black' : 'white'};
          }
        `}</style>
        <Checkbox
          isSelected={lightTheme}
          color='primary'
          css={{
            width: 'calc(100% - 2rem)',
          }}
          onChange={(checked) => {
            setLightTheme(checked)
          }}>
          Light Theme
        </Checkbox>
        <Checkbox
          isSelected={colorFul}
          color='primary'
          css={{
            width: 'calc(100% - 2rem)',
          }}
          onChange={(checked) => {
            setColorFul(checked)
          }}>
          Colorful
        </Checkbox>
        <Spacer y={0.6} />
        <Button
          color='primary'
          css={{
            width: 'calc(100% - 2rem)',
            color: darkMode ? 'black' : 'white',
          }}
          onClick={() => {
            const theme = generateRandomKeyboardTheme(lightTheme, {
              colorFul: colorFul,
              presets: presets.map((preset) => preset.name),
            })
            onColorsChanged(theme)
            setPreset(presets.find((preset) => preset.name === theme.preset)!)
          }}>
          Random Theme
        </Button>
        <Spacer y={0.6} />
        <Button
          color='primary'
          css={{
            width: 'calc(100% - 2rem)',
            color: darkMode ? 'black' : 'white',
          }}
          onClick={async () => {
            const colors = await getColorsFromPicture(lightTheme, {
              colorFul: colorFul,
            })
            onColorsChanged(colors)
          }}>
          Theme from Picture
        </Button>
        <Spacer y={0.6} />
        <Button.Group color='primary' bordered>
          <Button
            css={{
              color: darkMode ? 'white' : 'black',
            }}
            onClick={async () => {
              const shareData: ShareData = {
                url: buildUrl('creator', colors),
              }
              await navigator.share(shareData)
            }}>
            Share
          </Button>
          <Button
            css={{
              color: darkMode ? 'white' : 'black',
            }}
            onClick={async () => {
              getTheme(
                preset,
                document.querySelector('.key_box') as HTMLElement,
                colors
              )
            }}>
            Download
          </Button>
        </Button.Group>
      </div>
    </div>
  )
}

export default KeyboardSettings
