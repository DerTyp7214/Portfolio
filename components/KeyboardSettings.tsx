import { KeyboardColors } from '../types/types'
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

const KeyboardSettings = ({ colors, onColorsChanged }: Props) => {
  console.log(colors)
  return (
    <div className='inline-flex flex-col items-end'>
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
    </div>
  )
}

export default KeyboardSettings
