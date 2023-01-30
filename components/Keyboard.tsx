import { KeyboardTheme } from '../types/types'

type Props = {
  theme: KeyboardTheme
  preview?: string
}

function Keyboard({ theme, preview }: Props) {
  return (
    <>
      <style global>{`
          :root {
            --main-bg: ${theme.mainBackground};
    
            --key-bg: ${theme.keyBackground};
            --key-color: ${theme.keyColor};
            --key-border-radius: ${theme.keyBorderRadius}em;
    
            --second-key-bg: ${theme.secondaryKeyBackground};
    
            --accent-bg: ${theme.accentBackground};
    
            --font-size: ${theme.fontSize};
        }

        .keyboard_creator {
          margin-top: 0.5em;
          border-radius: 0.5em;
          border-width: 0.06em;
          margin: 0.33em;
          overflow: hidden;
          font-size: var(--font-size);
          width: 18em;
          height: 12em;
        }
      `}</style>
      <div
        className='keyboard_creator border-black dark:border-white'
        dangerouslySetInnerHTML={{ __html: preview ?? '' }}></div>
    </>
  )
}

export default Keyboard
