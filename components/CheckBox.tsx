import React from 'react'
import { useAppContext } from './appContext'

type Props = {
  id: string
  label: string
  checked: boolean
  'data-tooltip-content'?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function CheckBox({ id, label, checked, onChange, ...props }: Props) {
  const { darkMode } = useAppContext()

  return (
    <label
      className='container block relative cursor-pointer pl-[40px] text-lg select-none transition-all duration-200 group mt-1 mb-1'
      style={{ width: 'calc(100% - 2rem)' }}
      data-tooltip-content={props['data-tooltip-content']}>
      <style jsx>{`
        .container {
          --color-accent: ${darkMode
            ? process.env.NEXT_PUBLIC_COLOR_ACCENT_DARK
            : process.env.NEXT_PUBLIC_COLOR_ACCENT};
          --color-background: ${darkMode
            ? process.env.NEXT_PUBLIC_COLOR_BACKGROUND_DARK
            : process.env.NEXT_PUBLIC_COLOR_BACKGROUND};
          --color-checkmark: ${darkMode ? '#ffffff60' : '#00000040'};
        }
      `}</style>
      {label}
      <input
        type='checkbox'
        id={id}
        checked={checked}
        onChange={onChange}
        className='absolute opacity-0 cursor-pointer h-0 w-0 peer'
      />
      <span className='checkmark absolute top-1/2 left-[5px] w-[25px] h-[25px] bg-black/60 dark:bg-white/80 translate-y-[-50%] transition-all duration-200 rounded-md after:absolute after:hidden after:content-[""] after:left-[9px] after:top-[5px] after:w-[5px] after:h-[10px] after:rotate-45 after:border-r-[3px] after:border-b-[3px] peer-checked:after:block group-hover:bg-[var(--color-checkmark)] peer-checked:bg-[var(--color-accent)] after:border-[var(--color-background)]' />
    </label>
  )
}

export default CheckBox
