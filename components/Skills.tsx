import { motion } from 'framer-motion'
import React from 'react'
import { Skill } from '../types/types'
import SkillItem from './SkillItem'

type Props = {
    skills: Skill[]
}

export default function Skills({ skills }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className='flex relative text-center flex-row max-w-[2000px] px-10 min-h-screen justify-center space-y-0 mx-auto items-start'>
            <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
                Skills
            </h3>

            <h3 className='absolute top-36 uppercase tracking-[3px] text-gray-500 text-sm'>Hover over a skill for some informations</h3>

            <div className='opacity-100 w-auto md:opacity-0 md:w-0 pt-48 grid grid-cols-3 gap-5'>
                {skills?.slice(0, Math.min(skills.length, 3 * 5))?.map((skill, index) => <SkillItem key={index} skill={skill} directionLeft={index % 3 < 1} />)}
            </div>
            <div className='opacity-0 w-0 md:opacity-100 md:w-auto lg:opacity-0 lg:w-0 pt-48 grid grid-cols-4 gap-5'>
                {skills?.slice(0, Math.min(skills.length, 4 * 5))?.map((skill, index) => <SkillItem key={index} skill={skill} directionLeft={index % 4 < 2} />)}
            </div>
            <div className='w-0 opacity-0 lg:opacity-100 lg:w-auto pt-48 grid grid-cols-5 gap-5'>
                {skills?.slice(0, Math.min(skills.length, 5 * 5))?.map((skill, index) => <SkillItem key={index} skill={skill} directionLeft={index % 5 < (index > skills.length / 2 ? 3 : 2)} />)}
            </div>

        </motion.div >
    )
}