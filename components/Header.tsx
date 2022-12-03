/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion'
import Link from 'next/link'
import { SocialIcon } from 'react-social-icons'
import { Social } from '../types/types'

type Props = {
  socials: Social[]
}

export default function Header({ socials }: Props) {
  return (
    <header className='sticky z-50 top-0 bg-background/70 backdrop-blur-[5px]'>
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
          {socials?.map((social, index) => (
            <SocialIcon
              key={index}
              url={social.url}
              fgColor='gray'
              bgColor='transparent'
              target='_blank'
              className='hover:brightness-150 hover:scale-125 transition-all duration-200'
            />
          ))}
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
          className='flex flex-row items-center text-gray-300 cursor-pointer hover:brightness-150 transition-all duration-200 group'>
          <SocialIcon
            url='#contact'
            network='email'
            fgColor='gray'
            bgColor='transparent'
            className='group-hover:scale-125 transition-all duration-200'
          />
          <Link href='#contact'>
            <p className='uppercase hidden md:inline-flex text-sm text-gray-400'>
              Get In Touch
            </p>
          </Link>
        </motion.div>
      </div>
    </header>
  )
}
