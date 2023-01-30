import { Button, Modal, Spacer } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { Color, ColorResult, CustomPicker, SwatchesPicker } from 'react-color'
import { Range } from 'react-range'
import {
  clamp,
  lighnessGrades,
  matchingColors,
  toHex,
  toHSL,
  toRGB
} from '../utils/colorUtils'
import { useAppContext } from './appContext'

type Props = {
  colorVar?: Color
  submitColor: (color?: Color) => any
}

const Slider = (props: {
  gradientStart?: string
  gradientCenter?: string
  gradientEnd?: string
  value: number
  onChange: (value: number) => void
}) => {
  const { value, onChange, gradientStart, gradientCenter, gradientEnd } = props

  return (
    <Range
      step={0.001}
      min={0}
      max={1}
      values={[value]}
      onChange={(values) => onChange(values[0])}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: '12px',
            width: '100%',
            background: `linear-gradient(to right, ${gradientStart ?? '#fff'}${
              gradientCenter ? `, ${gradientCenter}` : ''
            }, ${gradientEnd ?? '#000'})`,
          }}>
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          className='w-[18px] h-[18px] rounded-full bg-white translate-x-[-9px] translate-y-[-1px] shadow-md'
        />
      )}
    />
  )
}

const Picker = ({ colorVar, submitColor }: Props) => {
  const [picking, setPicking] = useState(false)
  const [color, setColor] = useState<Color>()
  const [isBrowser, setIsBrowser] = useState(false)
  const { darkMode } = useAppContext()

  useEffect(() => {
    setColor(colorVar)
  }, [colorVar])

  useEffect(() => {
    setIsBrowser(window !== undefined)
  }, [])

  useEffect(() => {
    if (colorVar) setColor(colorVar)
  }, [colorVar, setColor])

  const close = () => {
    setPicking(false)
  }

  const handleChange = (colorResult: ColorResult | Color) => {
    if (Object.hasOwnProperty.call(colorResult, 'hex'))
      setColor((colorResult as ColorResult).hex)
    else setColor(colorResult as Color)
  }

  const swatches = () => {
    const grayTones = Array.from({ length: 5 }, (_, i) => {
      const gray = clamp(Math.round((i / 4) * 255), 0, 225)
      return toHex({ r: gray, g: gray, b: gray })
    })
    const swatches = [
      ...matchingColors(
        toHex({
          ...toHSL(color),
          l: 0.5,
        })
      ).map((color) => lighnessGrades(color)),
      grayTones,
    ]

    const uniqueSwatches = swatches.filter(
      (swatch, index) =>
        swatches.findIndex((swatch2) => swatch2[0] === swatch[0]) === index
    )

    return uniqueSwatches
  }

  return (
    <>
      <div
        style={{
          width: '2.6em',
          height: '2.6em',
          borderRadius: '.5em',
          margin: '.5em',
          borderWidth: '.08em',
          cursor: 'pointer',
          background: toHex(colorVar),
        }}
        className='border-black dark:border-white transition-all duration-300 ease-in-out'
        onClick={() => {
          setPicking(true)
        }}
      />
      <Modal
        closeButton
        blur
        open={isBrowser && picking}
        onClose={close}
        css={{
          background: 'theme.colors.background',
        }}>
        <Modal.Body className={darkMode ? 'dark' : ''}>
          <style global>{`
          .nextui-modal-close-icon {
            color: ${darkMode ? 'white' : 'black'};
          }
          `}</style>
          <Spacer y={0.6} />
          <div
            style={{
              height: '2.6em',
              borderRadius: '.5em',
              borderWidth: '.08em',
              background: toHex(color),
              transition: 'all .3s ease',
            }}
            className='border-black dark:border-white w-full'>
            <input
              className='w-full h-full rounded-lg bg-transparent outline-none text-center text-sm'
              style={{
                color: toHSL(color).l > 0.5 ? 'black' : 'white',
              }}
              type='text'
              maxLength={7}
              defaultValue={toHex(color).toUpperCase()}
              onInput={(event) => {
                ;(event.target as HTMLInputElement).value = (
                  event.target as HTMLInputElement
                ).value.toUpperCase()
              }}
              onChange={(event) => {
                if (event.target.value.match(/^#([A-Fa-f0-9]{6})$/))
                  setColor(event.target.value)
              }}
            />
          </div>

          <Slider
            gradientStart={toHex({ r: 0, g: 0, b: 0 })}
            gradientEnd={toHex({ r: 255, g: 0, b: 0 })}
            value={toRGB(color).r / 255}
            onChange={(value) => {
              handleChange({
                ...toRGB(color),
                r: value * 255,
              })
            }}
          />
          <Slider
            gradientStart={toHex({ r: 0, g: 0, b: 0 })}
            gradientEnd={toHex({ r: 0, g: 255, b: 0 })}
            value={toRGB(color).g / 255}
            onChange={(value) => {
              handleChange({
                ...toRGB(color),
                g: value * 255,
              })
            }}
          />
          <Slider
            gradientStart={toHex({ r: 0, g: 0, b: 0 })}
            gradientEnd={toHex({ r: 0, g: 0, b: 255 })}
            value={toRGB(color).b / 255}
            onChange={(value) => {
              handleChange({
                ...toRGB(color),
                b: value * 255,
              })
            }}
          />
          <Slider
            gradientStart={toHex({ r: 0, g: 0, b: 0 })}
            gradientCenter={toHex({
              ...toHSL(color),
              l: 0.5,
            })}
            gradientEnd={toHex({ r: 255, g: 255, b: 255 })}
            value={toHSL(color).l}
            onChange={(value) => {
              handleChange({
                ...toHSL(color),
                l: value,
              })
            }}
          />
          <Slider
            gradientStart={toHex({
              ...toHSL(color),
              s: 0,
            })}
            gradientEnd={toHex({
              ...toHSL(color),
              s: 1,
            })}
            value={toHSL(color).s}
            onChange={(value) => {
              handleChange({
                ...toHSL(color),
                s: value,
              })
            }}
          />

          <SwatchesPicker
            color={color}
            colors={swatches()}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            color='primary'
            css={{
              color: 'black',
            }}
            onClick={() => {
              submitColor(color)
              close()
            }}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CustomPicker(Picker)
