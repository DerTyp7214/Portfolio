import { KeyboardColors } from '../types/types'
import { getTheme } from '../utils/themeUtils'
import Picker from './Picker'

type Props = {
  colors: KeyboardColors
  onColorsChanged: (colors: KeyboardColors) => void
}

const colorVars: (keyof KeyboardColors)[] = [
  'mainBackground',
  'keyBackground',
  'keyColor',
  'secondaryKeyBackground',
  'accentBackground',
]

const nameMapping: {
  [key in keyof KeyboardColors]: string
} = {
  mainBackground: 'Main Background',
  keyBackground: 'Key Background',
  keyColor: 'Key Color',
  secondaryKeyBackground: 'Secondary Key Background',
  accentBackground: 'Accent Background',
}

const buildUrl = (path: string = '', colors: KeyboardColors): string => {
  let url = `${window.location.origin}/${path}`
  url += `?mainBg=${colors.mainBackground?.substring(1)}`
  url += `&keyBg=${colors.keyBackground?.substring(1)}`
  url += `&keyColor=${colors.keyColor?.substring(1)}`
  url += `&secondKeyBg=${colors.secondaryKeyBackground?.substring(1)}`
  url += `&accentBg=${colors.accentBackground?.substring(1)}`
  url += `&themeName=${encodeURIComponent(colors.themeName ?? 'Rboard Theme')}`
  url += `&author=${encodeURIComponent(colors.author ?? 'Web-Creator')}`
  url += `&preset=${colors.preset ?? 'default'}`
  return url
}

const KeyboardSettings = ({ colors, onColorsChanged }: Props) => {
  return (
    <div className='inline-flex w-full xl:w-auto flex-col items-end'>
      {colorVars.map((colorVar, index) => (
        <div key={index} className='flex items-center'>
          <span className='text-white'>{nameMapping[colorVar]}</span>
          <Picker
            colorVar={colors[colorVar]}
            submitColor={(color) => {
              onColorsChanged({
                ...colors,
                [colorVar]: color.hex,
              })
            }}
          />
        </div>
      ))}
      <div className='flex flex-col items-center w-full mt-4'>
        <input
          type='text'
          placeholder='Author'
          className='bg-transparent text-black dark:text-white rounded-lg p-2 border-black/10 dark:border-white/10 border-[1px] hover:border-black hover:dark:border-white transition-all duration-200 m-2 text-lg'
          style={{
            width: 'calc(100% - 2rem)',
          }}
          value={colors.author}
          onChange={(e) => {
            onColorsChanged({
              ...colors,
              author: e.target.value,
            })
          }}
        />
        <input
          type='text'
          placeholder='Theme Name'
          className='bg-transparent text-black dark:text-white rounded-lg p-2 border-black/10 dark:border-white/10 border-[1px] hover:border-black hover:dark:border-white transition-all duration-200 m-2 text-lg'
          style={{
            width: 'calc(100% - 2rem)',
          }}
          value={colors.themeName}
          onChange={(e) => {
            onColorsChanged({
              ...colors,
              themeName: e.target.value,
            })
          }}
        />
        <div
          className='flex flex-row'
          style={{
            width: 'calc(100% - 1rem)',
          }}>
          <button
            className='flex-grow bg-transparent rounded-lg p-2 border-black/10 dark:border-white/10 border-[1px] hover:border-black hover:dark:border-white transition-all duration-200 m-2 text-lg'
            onClick={async () => {
              const shareData: ShareData = {
                url: buildUrl('creator', colors),
              }
              await navigator.share(shareData)
            }}>
            Share
          </button>
          <button
            className='flex-grow bg-transparent rounded-lg p-2 border-black/10 dark:border-white/10 border-[1px] hover:border-black hover:dark:border-white transition-all duration-200 m-2 text-lg'
            onClick={async () => {
              getTheme(
                document.querySelector('.key_box') as HTMLElement,
                colors
              )
            }}>
            Download
          </button>
        </div>
      </div>
    </div>
  )
}

export default KeyboardSettings
