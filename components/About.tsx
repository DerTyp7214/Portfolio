import { ClipboardIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ProfileInfo } from '../types/types'
import { getBackgroundColor, rgbStringToHex } from '../utils/colorUtils'

type Props = {
  profileInfo: ProfileInfo
  darkMode: boolean
}

export default function About({ darkMode }: Props) {
  const [accentColor, setAccentColor] = useState(
    process.env.NEXT_PUBLIC_COLOR_ACCENT
  )
  const [tertiaryColor, setTertiaryColor] = useState(
    process.env.NEXT_PUBLIC_COLOR_TERTIARY
  )
  const [backgroundColor, setBackgroundColor] = useState(
    process.env.NEXT_PUBLIC_COLOR_BACKGROUND
  )
  const [secondaryBackgroundColor, setSecondaryBackgroundColor] = useState(
    process.env.NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND
  )

  useEffect(() => {
    if (window) {
      setAccentColor(rgbStringToHex(getBackgroundColor('accent')))
      setTertiaryColor(rgbStringToHex(getBackgroundColor('tertiary')))
      setBackgroundColor(rgbStringToHex(getBackgroundColor('background')))
      setSecondaryBackgroundColor(
        rgbStringToHex(getBackgroundColor('secondaryBackground'))
      )
    }
  }, [darkMode])

  return (
    <motion.div className='relative min-h-screen flex flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center'>
      <h3 className='absolute top-24 uppercase tracking-[20px] text-black/50 dark:text-white/30 text-2xl xl:ml-10'>
        About
      </h3>

      <motion.div
        initial={{
          x: -200,
          opacity: 0,
        }}
        transition={{
          duration: 1.2,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
        viewport={{ once: true }}
        style={{
          transitionProperty: 'width, height, borderRadius',
        }}
        className='transition-all duration-200 mb-10 mt-36 md:mt-10 md:mb-0 flex-shrink-0 w-56 h-56 md:w-64 md:h-95 xl:w-[500px] xl:h-[600px] overflow-hidden relative'>
        <div
          id='accent'
          className='rounded-[50%] transition-all duration-200 md:rounded-xl w-full h-full bg-accent dark:bg-accentDark absolute top-0 left-0 z-0'>
          <h1
            className='transition-all duration-200 absolute bottom-[50%] md:bottom-[75%] right-[50%] md:right-[25%] translate-y-[50%] translate-x-[50%] text-sm md:text-lg text-white/80 dark:text-black/80 text-center rotate-[-45deg] md:rotate-0 cursor-pointer select-none'
            onClick={() => {
              if (accentColor) navigator.clipboard.writeText(accentColor)
              toast('Color copied to clipboard', {
                type: 'info',
                icon: () => <ClipboardIcon className='h-6 w-6' />,
              })
            }}>
            Accent
            <span className='hidden md:block text-sm xl:text-lg'>
              {accentColor}
            </span>
          </h1>
        </div>
        <div
          id='secondaryBackground'
          className='rounded-[50%] transition-all duration-200 md:rounded-xl w-[46%] h-[46%] bg-secondaryBackground dark:bg-secondaryBackgroundDark absolute top-[2%] left-[2%] z-10 items-center flex justify-center border-accent dark:border-accentDark border-4'>
          <h1
            className='transition-all duration-200 text-tertiary dark:text-accentDark text-center text-sm md:text-lg cursor-pointer select-none'
            onClick={() => {
              if (secondaryBackgroundColor)
                navigator.clipboard.writeText(secondaryBackgroundColor)
              toast('Color copied to clipboard', {
                type: 'info',
                icon: () => <ClipboardIcon className='h-6 w-6' />,
              })
            }}>
            Secondary Background
            <span className='hidden md:block text-sm xl:text-lg'>
              {secondaryBackgroundColor}
            </span>
          </h1>
        </div>
        <div
          id='background'
          className='rounded-[50%] transition-all duration-200 md:rounded-xl w-[46%] h-[46%] bg-background dark:bg-backgroundDark absolute bottom-[2%] right-[2%] z-10 items-center flex justify-center border-accent dark:border-accentDark border-4'>
          <h1
            className='transition-all duration-200 text-tertiary dark:text-accentDark text-center text-sm md:text-lg cursor-pointer select-none'
            onClick={() => {
              if (backgroundColor)
                navigator.clipboard.writeText(backgroundColor)
              toast('Color copied to clipboard', {
                type: 'info',
                icon: () => <ClipboardIcon className='h-6 w-6' />,
              })
            }}>
            Background
            <span className='hidden md:block text-sm xl:text-lg'>
              {backgroundColor}
            </span>
          </h1>
        </div>
        <div
          id='tertiary'
          className='rounded-[50%] transition-all duration-200 md:rounded-xl w-[46%] h-[46%] bg-tertiary dark:bg-tertiaryDark absolute bottom-[2%] left-[2%] z-10 items-center flex justify-center border-accent dark:border-accentDark border-4'>
          <h1
            className='transition-all duration-200 text-white/80 dark:text-black/80 text-center text-sm md:text-lg cursor-pointer select-none'
            onClick={() => {
              if (tertiaryColor) navigator.clipboard.writeText(tertiaryColor)
              toast('Color copied to clipboard', {
                type: 'info',
                icon: () => <ClipboardIcon className='h-6 w-6' />,
              })
            }}>
            Tertiary
            <span className='hidden md:block text-sm xl:text-lg'>
              {tertiaryColor}
            </span>
          </h1>
        </div>
      </motion.div>

      <div className='space-y-10 px-0 md:px-10'>
        <h4 className='text-4xl font-semibold'>
          Here is a{' '}
          <span className='underline decoration-accent/50 dark:decoration-accentDark/50'>
            little
          </span>{' '}
          background
        </h4>

        <p className='text-base'>
          I had not idea what to write here, so I made the website to use daily
          new generated colors. The colors are generated from a small script
          which generates one accent color and 2 background colors. I used{' '}
          <a
            href='https://tailwindcss.com/'
            target='_blank'
            rel='noopener noreferrer'
            className='underline decoration-accent/50 dark:decoration-accentDark/50'>
            Tailwind CSS
          </a>{' '}
          for the styling,{' '}
          <a
            href='https://framer.com/motion/'
            target='_blank'
            rel='noopener noreferrer'
            className='underline decoration-accent/50 dark:decoration-accentDark/50'>
            Framer Motion
          </a>{' '}
          for the animations,{' '}
          <a
            href='https://nextjs.org/'
            target='_blank'
            rel='noopener noreferrer'
            className='underline decoration-accent/50 dark:decoration-accentDark/50'>
            Next.js
          </a>{' '}
          for the routing and{' '}
          <a
            href='https://www.typescriptlang.org/'
            target='_blank'
            rel='noopener noreferrer'
            className='underline decoration-accent/50 dark:decoration-accentDark/50'>
            TypeScript
          </a>{' '}
          for the type checking. The website is hosted on GitHub pages and build
          daily with GitHub Actions.
        </p>
      </div>
    </motion.div>
  )
}
