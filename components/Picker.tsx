import { useEffect, useState } from 'react'
import ClickAwayListener from 'react-click-away-listener'
import { Color, ColorPicker, toColor, useColor } from 'react-color-palette'
import 'react-color-palette/lib/css/styles.css'
import { isMobile } from '../utils/pageUtils'

type Props = {
  colorVar?: string
  submitColor: (color: Color) => any
}

const Picker = ({ colorVar, submitColor }: Props) => {
  const [picking, setPicking] = useState(false)
  const [color, setColor] = useColor('hex', colorVar ?? '#000000')

  const nativeColorPicker = () => {
    const input = document.createElement('input')
    input.type = 'color'
    input.value = color.hex
    input.addEventListener('input', () => {
      setColor(toColor('hex', input.value))
    })
    input.addEventListener('change', () => {
      submitColor(toColor('hex', input.value))
    })
    input.click()
  }

  useEffect(() => {
    if (colorVar) setColor(toColor('hex', colorVar))
  }, [colorVar, setColor])

  return (
    <>
      <div
        style={{
          width: '2.6em',
          height: '2.6em',
          borderRadius: '.5em',
          margin: '.5em',
          border: '.08em solid white',
          cursor: 'pointer',
          background: color.hex,
        }}
        onClick={() => {
          if (isMobile()) {
            nativeColorPicker()
          } else setPicking(true)
        }}
      />
      {picking && (
        <div
          style={{
            position: 'absolute',
            zIndex: 100,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
          <ClickAwayListener
            onClickAway={() => {
              submitColor(color)
              setPicking(false)
            }}>
            <div onClick={(event) => event.persist()}>
              <ColorPicker
                width={300}
                color={color}
                onChange={setColor}
                dark
                onChangeComplete={setColor}
              />
            </div>
          </ClickAwayListener>
        </div>
      )}
    </>
  )
}

export default Picker
