/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import { ProfileInfo } from '../types/types'
import BackgroundCircles from './BackgroundCircles'

type Props = {
  profileInfo: ProfileInfo
}

export default function Profile({ profileInfo }: Props) {
  const [text] = useTypewriter({
    words: [
      `Hi, my Name is ${profileInfo.name}`,
      'Android Development',
      'Web Development',
    ],
    delaySpeed: 2000,
    loop: true,
  })

  return (
    <div className='h-screen flex flex-col space-y-8 items-center justify-center text-center overflow-hidden'>
      <BackgroundCircles />

      <motion.div className='relative w-32 h-32'>
        <img
          className='filter object-cover absolute top-0 left-0 w-full h-full rounded-full overflow-hidden'
          src={profileInfo.avatarUrl}
          alt='avatar'
        />
      </motion.div>

      <div className='z-20'>
        <h2 className='text-sm uppercase text-black/50 dark:text-white/30 pb-2 tracking-[15px]'>
          Software Engineer
        </h2>
        <h1 className='text-4xl lg:text-5xl font-semibold px-10'>
          <span className='mr-3'>{text}</span>
          <span className='text-accent dark:text-accentDark'>
            <Cursor />
          </span>
        </h1>

        <div className='pt-5'>
          <Link href='#about'>
            <button className='heroButton'>About</button>
          </Link>
          <Link href='#projects'>
            <button className='heroButton'>Projects</button>
          </Link>
          <Link href='#skills'>
            <button className='heroButton'>Skills</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
