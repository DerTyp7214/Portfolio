import { KeyboardTheme } from '../types/types'
import { getIcon } from '../utils/iconUtils'

type Props = {
  theme: KeyboardTheme
}

type KeyProps = {
  mainKey: string
  secondaryKey?: string
  width?: number
  borderRadius: number
  color: string
  textColor: string
  onClick?: () => void
}

const Key = ({
  mainKey,
  secondaryKey,
  width,
  borderRadius = 0,
  color,
  textColor,
  onClick,
}: KeyProps) => {
  const letterElement = (key: string) => {
    switch (key) {
      case '?123':
        return <span className='letter l123'>{key}</span>
      case 'locale':
        return <div className='locale'>{getIcon('locale')}</div>
      case 'backspace':
        return <div className='backspace'>{getIcon('backspace')}</div>
      case 'space':
        return <span className='letter'>Rboard</span>
      case 'return':
        return <div className='return'>{getIcon('return')}</div>
      case 'shift':
        return <div className='shift'>{getIcon('shift')}</div>
      default:
        return <span className='letter'>{key}</span>
    }
  }
  const secondaryLetterElement = (key?: string) => {
    if (!key) return null
    switch (key) {
      case 'emoji':
        return <div className='emoji'>{getIcon('emoji')}</div>
      default:
        return <span className='secondary_letter'>{key}</span>
    }
  }

  return (
    <>
      <style jsx>{`
        .simple_key {
          background-color: ${color};
          color: ${textColor};

          border-radius: ${borderRadius}em;

          width: 1.45em;
          padding: 0.13em;
          margin: 0.13em;
          position: relative;

          transition: all 0.2s ease-in-out;
        }
        .custom_key {
          width: ${width}em;
        }
      `}</style>
      <div
        className={`simple_key ${width ? 'custom_key' : ''}`}
        onClick={onClick}>
        {letterElement(mainKey)}
        {secondaryLetterElement(secondaryKey)}
      </div>
    </>
  )
}

function Keyboard({ theme }: Props) {
  const keyRows: {
    key: string
    secondaryKey?: string
    width?: number
    color: string
    textColor: string
  }[][] = [
    [
      {
        key: 'q',
        secondaryKey: '1',
        color: theme.keyBackground,
        textColor: theme.keyColor,
      },
      {
        key: 'w',
        secondaryKey: '2',
        color: theme.keyBackground,
        textColor: theme.keyColor,
      },
      {
        key: 'e',
        secondaryKey: '3',
        color: theme.keyBackground,
        textColor: theme.keyColor,
      },
      {
        key: 'r',
        secondaryKey: '4',
        color: theme.keyBackground,
        textColor: theme.keyColor,
      },
      {
        key: 't',
        secondaryKey: '5',
        color: theme.keyBackground,
        textColor: theme.keyColor,
      },
      {
        key: 'z',
        secondaryKey: '6',
        color: theme.keyBackground,
        textColor: theme.keyColor,
      },
      {
        key: 'u',
        secondaryKey: '7',
        color: theme.keyBackground,
        textColor: theme.keyColor,
      },
      {
        key: 'i',
        secondaryKey: '8',
        color: theme.keyBackground,
        textColor: theme.keyColor,
      },
      {
        key: 'o',
        secondaryKey: '9',
        color: theme.keyBackground,
        textColor: theme.keyColor,
      },
      {
        key: 'p',
        secondaryKey: '0',
        color: theme.keyBackground,
        textColor: theme.keyColor,
      },
    ],
    [
      { key: 'a', color: theme.keyBackground, textColor: theme.keyColor },
      { key: 's', color: theme.keyBackground, textColor: theme.keyColor },
      { key: 'd', color: theme.keyBackground, textColor: theme.keyColor },
      { key: 'f', color: theme.keyBackground, textColor: theme.keyColor },
      { key: 'g', color: theme.keyBackground, textColor: theme.keyColor },
      { key: 'h', color: theme.keyBackground, textColor: theme.keyColor },
      { key: 'j', color: theme.keyBackground, textColor: theme.keyColor },
      { key: 'k', color: theme.keyBackground, textColor: theme.keyColor },
      { key: 'l', color: theme.keyBackground, textColor: theme.keyColor },
    ],
    [
      {
        key: 'shift',
        width: 2.11,
        color: theme.secondaryKeyBackground,
        textColor: theme.keyColor,
      },
      { key: 'y', color: theme.keyBackground, textColor: theme.keyColor },
      { key: 'x', color: theme.keyBackground, textColor: theme.keyColor },
      { key: 'c', color: theme.keyBackground, textColor: theme.keyColor },
      { key: 'v', color: theme.keyBackground, textColor: theme.keyColor },
      { key: 'b', color: theme.keyBackground, textColor: theme.keyColor },
      { key: 'n', color: theme.keyBackground, textColor: theme.keyColor },
      { key: 'm', color: theme.keyBackground, textColor: theme.keyColor },
      {
        key: 'backspace',
        width: 2.11,
        color: theme.secondaryKeyBackground,
        textColor: theme.keyColor,
      },
    ],
    [
      {
        key: '?123',
        width: 2.11,
        color: theme.secondaryKeyBackground,
        textColor: theme.keyColor,
      },
      {
        key: ',',
        secondaryKey: 'emoji',
        color: theme.secondaryKeyBackground,
        textColor: theme.keyColor,
      },
      { key: 'locale', color: theme.keyBackground, textColor: theme.keyColor },
      {
        key: 'space',
        width: 6.56,
        color: theme.keyBackground,
        textColor: theme.keyColor,
      },
      {
        key: '.',
        color: theme.secondaryKeyBackground,
        textColor: theme.keyColor,
      },
      {
        key: 'return',
        width: 2.11,
        color: theme.accentBackground,
        textColor: theme.mainBackground,
      },
    ],
  ]

  return (
    <>
      <style global>{`
        .keyboard {
          font-size: ${theme.fontSize};
          font-family: 'Product Sans', monospace;
        }
        .keyboard_body {
          margin-top: 0.5em;
          border-radius: 0.5em;
          border: 0.06em solid white;

          background-color: ${theme.mainBackground};

          margin: 0.33em;
          width: 18em;
          height: 12em;

          transition: all 0.3s ease-in-out;
        }
        .top_bar {
          margin-left: 0.16em;
          margin-right: 0.16em;
          width: 17.66em;
          display: grid;
          padding-top: 0.2em;
          justify-content: space-between;
          grid-template-columns: repeat(3, auto);
        }
        .key_box {
          display: grid;
          grid-template-rows: repeat(5, 2.33em);
        }
        .keys {
          width: 18em;
          display: grid;
          justify-content: center;
          grid-template-columns: repeat(10, auto);
        }
        .secondary_letter {
          color: ${theme.keyColor};

          font-size: 0.4em;
          position: absolute;
          top: 0.15em;
          right: 0.25em;

          transition: all 0.3s ease-in-out;
        }
        .emoji {
          position: absolute;
          top: 0.55em;
          left: 50%;
          transform: translateX(-50%);
        }
        .letter {
          font-size: 1em;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .l123 {
          font-size: 0.66em;
          white-space: nowrap;
        }
        .top_bar_key {
          width: 1.45em;
          padding: 0.13em;
          position: relative;
        }
        .top_action {
          width: 1.45em;
          height: 1.45em;
          padding: 0.13em;
          border-radius: 50%;
          position: relative;
        }
        .shift,
        .locale,
        .backspace,
        .return {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .return {
          color: ${theme.mainBackground};

          transition: all 0.3s ease-in-out;
        }
        .accent_color {
          background-color: ${theme.accentBackground};
          color: ${theme.mainBackground};

          transition: all 0.3s ease-in-out;
        }
        .action {
          color: ${theme.keyColor};

          transition: all 0.3s ease-in-out;
        }
        .rec_bar {
          width: 10em;
          color: ${theme.keyColor};
          margin: auto;
          display: grid;
          text-align: center;
          justify-content: space-between;
          grid-template-columns: repeat(3, 3em);

          transition: all 0.3s ease-in-out;
        }
      `}</style>
      <div className='keyboard'>
        <div className='keyboard_body'>
          <div className='key_box'>
            <div className='top_bar'>
              <div className='top_bar_key'>
                <div className='top_action top_bar_element accent_color'>
                  {getIcon('topAction')}
                </div>
              </div>
              <div className='rec_bar'>
                <span className='rec_text'>Rboard</span>
                <span className='rec_spacer'>|</span>
                <span className='rec_text'>Creator</span>
              </div>
              <div className='top_bar_key'>
                <div className='top_action top_bar_element action'>
                  {getIcon('topAction2')}
                </div>
              </div>
            </div>
            {keyRows.map((row, index) => (
              <div key={index} className='keys'>
                {row.map((key, index) => (
                  <Key
                    key={index}
                    mainKey={key.key}
                    borderRadius={theme.keyBorderRadius}
                    color={key.color}
                    textColor={key.textColor}
                    secondaryKey={key.secondaryKey}
                    width={key.width}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Keyboard
