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
                        scale: .5
                    }}
                    animate={{
                        x: 0,
                        opacity: 1,
                        scale: 1
                    }}
                    transition={{
                        duration: .8,
                    }}
                    className='flex flex-row items-center'>
                    {socials?.map((social, index) => (
                        <SocialIcon key={index} url={social.url} fgColor='gray' bgColor='transparent' target='_blank' />
                    ))}
                </motion.div>

                <motion.div
                    initial={{
                        x: 500,
                        opacity: 0,
                        scale: .5
                    }}
                    animate={{
                        x: 0,
                        opacity: 1,
                        scale: 1
                    }}
                    transition={{
                        duration: .8,
                    }}
                    className='flex flex-row items-center text-gray-300 cursor-pointer'>
                    <SocialIcon
                        url='#contact'
                        className='cursor-pointer'
                        network='email'
                        fgColor='gray'
                        bgColor='transparent'
                    />
                    <Link href='#contact'>
                        <p className='uppercase hidden md:inline-flex text-sm text-gray-400'>Get In Touch</p>
                    </Link>
                </motion.div>
            </div>
        </header>
    )
}