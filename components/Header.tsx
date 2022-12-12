/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { SocialIcon } from 'react-social-icons'
import { Social } from '../types/types'

import BaseHeader from './BaseHeader'

type Props = {
  socials: Social[]
}

export default function Header({ socials }: Props) {
  return (
    <BaseHeader
      leftContent={socials?.map((social, index) => (
        <SocialIcon
          key={index}
          url={social.url}
          fgColor={'currentcolor'}
          bgColor='transparent'
          target='_blank'
          className='text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white hover:scale-125 transition-all duration-200'
        />
      ))}
      rightContent={
        <>
          <SocialIcon
            url='#contact'
            network='email'
            fgColor={'currentcolor'}
            bgColor='transparent'
            className='text-black/50 group-hover:text-black dark:text-white/50 dark:group-hover:text-white group-hover:scale-125 transition-all duration-200'
          />
          <Link href='#contact'>
            <p className='text-black/50 group-hover:text-black dark:text-white/50 dark:group-hover:text-white uppercase hidden md:inline-flex text-sm transition-all duration-200'>
              Get In Touch
            </p>
          </Link>
        </>
      }></BaseHeader>
  )
}
