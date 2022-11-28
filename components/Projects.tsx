import React, { useRef, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { Project } from '../types/types'
import ProjectCard from './ProjectCard'

type Props = {
  projects: Project[]
}

export default function Projects({ projects }: Props) {
  const scrollElement = useRef<HTMLDivElement>(null)

  const [isLeft, setIsLeft] = useState(true)
  const [isRight, setIsRight] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className='min-h-screen flex flex-row relative overflow-hidden text-left max-w-full justify-evenly mx-auto items-start'>
      <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
        Projects
      </h3>

      <div
        className='absolute top-1/2 left-1 first-line:w-0 h-0 md:w-12 md:h-12 opacity-0 md:opacity-20 hover:opacity-100 transition-all duration-200 cursor-pointer z-40'
        style={{
          left: isLeft ? '-3rem' : '1rem',
        }}
        onClick={() => {
          scrollElement.current?.scrollBy({
            left: -scrollElement.current?.offsetWidth / 2,
            behavior: 'smooth',
          })
        }}>
        <ChevronLeftIcon />
      </div>

      <div
        ref={scrollElement}
        className='w-full flex mt-28 space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory customScroll relative'
        onScroll={(e) => {
          const scrollElement = e.target as HTMLDivElement

          if (scrollElement.scrollLeft === 0) {
            setIsLeft(true)
          } else {
            setIsLeft(false)
          }

          if (
            scrollElement.scrollLeft + scrollElement.clientWidth ===
            scrollElement.scrollWidth
          ) {
            setIsRight(true)
          } else {
            setIsRight(false)
          }
        }}>
        {projects?.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>

      <div
        className='absolute top-1/2 right-1 first-line:w-0 h-0 md:w-12 md:h-12 opacity-0 md:opacity-20 hover:opacity-100 transition-all duration-200 cursor-pointer z-40'
        style={{
          right: isRight ? '-3rem' : '1rem',
        }}
        onClick={() => {
          scrollElement.current?.scrollBy({
            left: scrollElement.current?.offsetWidth / 2,
            behavior: 'smooth',
          })
        }}>
        <ChevronRightIcon />
      </div>
    </motion.div>
  )
}
