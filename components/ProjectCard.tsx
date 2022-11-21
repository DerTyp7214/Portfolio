import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { Project } from '../types/types'

type Props = {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  return (
    <article className='relative flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 snap-center w-[90vw] max-w-[500px] md:w-[600px] md:max-w-none xl:w-[900px] bg-secondaryBackground p-10 opacity-60 hover:opacity-100 transition-all duration-200 overflow-hidden'>
      <motion.div
        initial={{
          y: -80,
          opacity: 0,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
        }}
        viewport={{ once: true }}
        style={{
          transitionProperty: 'width, height',
        }}
        className='w-32 h-32 rounded-3xl xl:w-[200px] xl:h-[200px] duration-200 overflow-hidden relative'>
        <Image src={project.imageUrl} alt={project.name} fill />
      </motion.div>

      <div className='px-0 md:px-10 max-w-full'>
        <h4 className='text-4xl font-light'>{project.name}</h4>
        <p className='text-xl fomt-bold mt-1 space-x-2 flex flex-wrap'>
          {project.authors
            .map((author, index) => (
              <Link
                key={index}
                href={`https://github.com/${author}`}
                target='_blank'>
                {author}
              </Link>
            ))
            .reduce((a, b) => [a, <span key={b.toString()}>&</span>, b] as any)}
        </p>

        <div className='flex space-x-2 my-2'>
          {project.skills.map((skill, index) => (
            <div
              key={index}
              className='h-12 w-12 rounded-[5px] bg-background/50 relative flex justify-center items-center'>
              <Image
                className='p-2 filter z-20'
                src={skill.imageUrl}
                alt={skill.name}
                fill
              />
              <div className='absolute top-0 left-0 w-full h-full peer z-40' />
              <span className='absolute p-1 top-[-30%] select-none rounded-[5px] opacity-0 peer-hover:opacity-100 transition-all bg-white/40 text-black backdrop-blur-[5px] z-30'>
                {skill.name}
              </span>
            </div>
          ))}
        </div>

        <div className='overflow-y-scroll pr-2 customScroll mb-8 h-[22vh]'>
          <ul className='list-disc sapce-y-4 ml-5 text-lg'>
            {project.keypoints.map((keypoint, index) => (
              <li key={index}>{keypoint}</li>
            ))}
          </ul>
        </div>

        <div className='absolute flex flex-row space-x-2 bottom-4'>
          {project.githubUrl && (
            <Link href={project.githubUrl} target='_blank'>
              <Image
                src='https://github.githubassets.com/favicons/favicon.svg'
                alt='Github'
                className='h-6 w-6'
                width='6'
                height='6'
              />
            </Link>
          )}
          {project.playStoreUrl && (
            <Link href={project.playStoreUrl} target='_blank'>
              <Image
                src='https://www.gstatic.com/android/market_images/web/favicon_v3.ico'
                alt='Github'
                className='h-6 w-6'
                width='6'
                height='6'
              />
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
