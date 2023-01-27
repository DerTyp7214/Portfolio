import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Color, ColorResult, CustomPicker, SwatchesPicker } from 'react-color'
import ReactDOM from 'react-dom'
import {
  clamp,
  lighnessGrades,
  matchingColors,
  toHex,
  toHSL,
  toRGB
} from '../utils/colorUtils'

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
    <div className='relative w-full h-[16px]'>
      <div className='absolute inset-0 rounded-[2px]'>
        <div
          className='px-2 py-0 relative h-full rounded-[2px]'
          style={{
            background: `linear-gradient(to right, ${gradientStart ?? '#fff'}${
              gradientCenter ? `, ${gradientCenter}` : ''
            }, ${gradientEnd ?? '#000'})`,
          }}
          onTouchMove={(event) => {
            const { left, width } = event.currentTarget.getBoundingClientRect()
            const x = event.touches[0].clientX - left
            const s = clamp(x / width, 0, 1)
            onChange(s)
          }}
          onMouseMove={(event) => {
            if (event.buttons === 1) {
              const { left, width } =
                event.currentTarget.getBoundingClientRect()
              const x = event.clientX - left
              const s = clamp(x / width, 0, 1)
              onChange(s)
            }
          }}>
          <div
            className='absolute'
            style={{
              left: `${clamp(value * 100, 0, 100)}%`,
            }}>
            <div className='w-[18px] h-[18px] rounded-full bg-white translate-x-[-9px] translate-y-[-1px] shadow-md' />
          </div>
        </div>
      </div>
    </div>
  )
}

const Picker = ({ colorVar, submitColor }: Props) => {
  const [picking, setPicking] = useState(false)
  const [color, setColor] = useState<Color>()
  const [isBrowser, setIsBrowser] = useState(false)
  const [internalVisible, setInternalVisible] = useState(picking)

  useEffect(() => {
    setColor(colorVar)
  }, [internalVisible, colorVar])

  useEffect(() => {
    setIsBrowser(window !== undefined)
  }, [])

  useEffect(() => {
    if (picking) {
      setInternalVisible(true)
    }
  }, [picking])

  const nativeColorPicker = () => {
    const input = document.createElement('input')
    input.type = 'color'
    input.value = toHex(color)
    input.addEventListener('input', () => {
      setColor(input.value)
    })
    input.addEventListener('change', () => {
      submitColor(input.value)
    })
    input.click()
  }

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
      {isBrowser &&
        internalVisible &&
        ReactDOM.createPortal(
          <motion.div
            initial={{
              backdropFilter: picking ? 'blur(0px)' : 'blur(8px)',
              backgroundColor: picking ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,.2)',
            }}
            animate={{
              backdropFilter: picking ? 'blur(8px)' : 'blur(0px)',
              backgroundColor: picking ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,0)',
            }}
            onClick={close}
            transition={{ duration: 0.3 }}
            className='fixed top-0 left-0 w-full h-full z-50'>
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{
                opacity: picking ? 0 : 1,
                filter: picking ? 'blur(20px)' : 'blur(0px)',
              }}
              animate={{
                opacity: picking ? 1 : 0,
                filter: picking ? 'blur(0px)' : 'blur(20px)',
              }}
              onAnimationComplete={() => {
                if (!picking) setInternalVisible(false)
              }}
              transition={{ duration: 0.3 }}
              className='modal-content fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-auto h-auto bg-secondaryBackground/80 dark:bg-secondaryBackgroundDark/80 rounded-2xl shadow-2xl shadow-black/50 p-5'>
              <div className='flex flex-col space-y-3 items-center'>
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

                <div className='w-full flex mt-2 justify-end'>
                  <button
                    onClick={() => {
                      submitColor(color)
                      close()
                    }}
                    className='p-2 border-[1px] border-black dark:border-white rounded-md'>
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>,
          document.getElementById('modal-root') as HTMLElement
        )}
    </>
  )
}

export default CustomPicker(Picker)
