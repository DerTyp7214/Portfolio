import { motion } from 'framer-motion'
import { ProfileInfo } from '../types/types'

type Props = {
  profileInfo: ProfileInfo
}

export default function About({ profileInfo }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className='relative min-h-screen flex flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center'>
      <h3 className='absolute top-24 uppercase tracking-[20px] text-white/30 text-2xl xl:ml-10'>
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
        className='mb-10 mt-36 md:mt-10 md:mb-0 flex-shrink-0 w-56 h-56 md:w-64 md:h-95 xl:w-[500px] xl:h-[600px] overflow-hidden relative'>
        <div className='rounded-[50%] duration-200 md:rounded-xl w-full h-full bg-accent absolute top-0 left-0 z-0'>
          <h1 className='absolute bottom-[50%] md:bottom-[75%] right-[50%] md:right-[25%] translate-y-[50%] translate-x-[50%] text-sm md:text-lg text-background text-center rotate-[-45deg] md:rotate-0'>
            Accent
          </h1>
        </div>
        <div className='rounded-[50%] duration-200 md:rounded-xl w-[46%] h-[46%] bg-secondaryBackground absolute top-[2%] left-[2%] z-10 items-center flex justify-center border-accent border-4'>
          <h1 className='text-accent text-center text-sm md:text-lg'>Secondary Background</h1>
        </div>
        <div className='rounded-[50%] duration-200 md:rounded-xl w-[46%] h-[46%] bg-background absolute bottom-[2%] right-[2%] z-10 items-center flex justify-center border-accent border-4'>
          <h1 className='text-accent text-center text-sm md:text-lg'>Background</h1>
        </div>
      </motion.div>

      <div className='space-y-10 px-0 md:px-10'>
        <h4 className='text-4xl font-semibold'>
          Here is a{' '}
          <span className='underline decoration-accent/50'>little</span>{' '}
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
            className='underline decoration-accent/50'>
            Tailwind CSS
          </a>{' '}
          for the styling,{' '}
          <a
            href='https://framer.com/motion/'
            target='_blank'
            rel='noopener noreferrer'
            className='underline decoration-accent/50'>
            Framer Motion
          </a>{' '}
          for the animations,{' '}
          <a
            href='https://nextjs.org/'
            target='_blank'
            rel='noopener noreferrer'
            className='underline decoration-accent/50'>
            Next.js
          </a>{' '}
          for the routing and{' '}
          <a
            href='https://www.typescriptlang.org/'
            target='_blank'
            rel='noopener noreferrer'
            className='underline decoration-accent/50'>
            TypeScript
          </a>{' '}
          for the type checking. The website is hosted on GitHub pages and build
          daily with GitHub Actions.
        </p>
      </div>
    </motion.div>
  )
}
