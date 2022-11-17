/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import { SocialIcon } from 'react-social-icons'
import { Project } from '../types/types'

type Props = {
    project: Project
}

export default function ProjectCard({ project }: Props) {
    return (
        <article className='relative flex flex-col rounded-lg items-center space-y-7 flex-shrink-0 snap-center w-[90vw] max-w-[500px] md:w-[600px] md:max-w-none xl:w-[900px] bg-secondaryBackground p-10 opacity-60 hover:opacity-100 transition-all duration-200 overflow-hidden'>
            <motion.img
                initial={{
                    y: -100,
                    opacity: 0,
                }}
                whileInView={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    duration: 1.2,
                }}
                viewport={{ once: true }}
                className='w-32 h-32 rounded-3xl xl:w-[200px] xl:h-[200px] object-contain object-center transition-all duration-200'
                src={project.imageUrl}
                alt={project.name} />

            <div className='px-0 md:px-10 max-w-full'>
                <h4 className='text-4xl font-light'>{project.name}</h4>
                <p className='text-xl fomt-bold mt-1 space-x-2 flex flex-wrap'>{project.authors.map((author, index) => <Link key={index} href={`https://github.com/${author}`} target='_blank'>{author}</Link>).reduce((a, b) => [a, <span>&</span>, b] as any)}</p>

                <div className='flex space-x-2 my-2'>
                    {project.skills.map((skill, index) =>
                        <div className='h-12 w-12 rounded-[5px] bg-background/50 relative flex justify-center items-center'>
                            <img key={index} className='p-2 filter z-20' src={skill.imageUrl} alt={skill.name} />
                            <div className='absolute top-0 left-0 w-full h-full peer z-50' />
                            <span className='absolute p-1 top-[-30%] select-none rounded-[5px] opacity-0 peer-hover:opacity-100 transition-all bg-white/40 text-black backdrop-blur-[5px] z-40'>{skill.name}</span>
                        </div>
                    )}
                </div>

                <div className='overflow-y-scroll pr-2 customScroll mb-8 h-[22vh]'>
                    <ul className='list-disc sapce-y-4 ml-5 text-lg'>
                        {project.keypoints.map((keypoint, index) => <li key={index}>{keypoint}</li>)}
                    </ul>
                </div>

                <div className='absolute flex flex-row space-x-2 bottom-4'>
                    {project.githubUrl && <Link href={project.githubUrl} target='_blank'>
                        <img src='https://github.githubassets.com/favicons/favicon.svg' alt='Github' className='h-6 w-6' />
                    </Link>}
                    {project.playStoreUrl && <Link href={project.playStoreUrl} target='_blank'>
                        <img src='https://www.gstatic.com/android/market_images/web/favicon_v3.ico' alt='Github' className='h-6 w-6' />
                    </Link>}
                </div>
            </div>
        </article>
    )
}