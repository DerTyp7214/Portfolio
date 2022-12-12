/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion'
import { useState } from 'react'
import AnimatedIcon from './AnimatedIcon'

import animationData from '../assets/sun_outline.json'
import { useAppContext } from './appContext'

type Props = {
  leftContent?: React.ReactNode
  rightContent?: React.ReactNode
}

export default function Header({ leftContent, rightContent }: Props) {
  const { darkMode, setDarkMode } = useAppContext()

  const [iconState, setIconState] = useState<0 | 1>(darkMode ? 1 : 0)

  const icon = (
    <AnimatedIcon
      animationData={animationData}
      className='w-12 h-12 p-[7px] md:p-0 md:w-14 md:h-14 opacity-50 dark:opacity-60 hover:scale-125 hover:opacity-100 dark:hover:opacity-100 invert dark:invert-0 transition-all duration-200'
      speed={1}
      state={iconState}
      onClick={() => {
        setDarkMode(iconState === 0)
        setIconState((state) => (state === 0 ? 1 : 0))
      }}
    />
  )

  return (
    <header className='sticky z-50 top-0 bg-background/70 dark:bg-backgroundDark/70 backdrop-blur-[5px]'>
      <div className='p-5 flex items-start justify-between max-w-7xl mx-auto xl:items-center'>
        <motion.div
          initial={{
            x: -500,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className='flex flex-row items-center'>
          {leftContent}
          <div className='inline-block md:hidden'>{icon}</div>
        </motion.div>

        <motion.div
          initial={{
            y: -100,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            y: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className='hidden md:block'>
          {icon}
        </motion.div>

        <motion.div
          initial={{
            x: 500,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className='text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white flex flex-row items-center cursor-pointer transition-all duration-200 group'>
          {rightContent}
        </motion.div>
      </div>
    </header>
  )
}
