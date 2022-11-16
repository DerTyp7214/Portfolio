import { motion } from 'framer-motion'
import React from 'react'
import { Project } from '../types/types'
import ProjectCard from './ProjectCard'

type Props = {
    projects: Project[]
}

export default function Projects({ projects }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className='h-screen flex flex-row relative overflow-hidden text-left max-w-full justify-evenly mx-auto items-start'>
            <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
                Projects
            </h3>

            <div className='w-full flex mt-28 space-x-5 overflow-x-scroll p-10 snap-x snap-mandatory customScroll'>
                {projects?.map((project, index) => <ProjectCard key={index} project={project} />)}
            </div>
        </motion.div>
    )
}