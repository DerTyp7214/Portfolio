/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion'
import React from 'react'
import { Skill } from '../types/types'

type Props = {
    skill: Skill,
    directionLeft?: boolean
}

export default function SkillItem({ skill, directionLeft }: Props) {
    return (
        <motion.div
            initial={{
                x: directionLeft ? -100 : 100,
                opacity: 0
            }}
            transition={{
                duration: 1,
            }}
            whileInView={{
                x: 0,
                opacity: 1
            }}
            viewport={{ once: true }}
            className='group relative flex cursor-pointer'>
            <div className='rounded-3xl border border-gray-500 bg-secondaryBackground flex flex-col items-center justify-center overflow-hidden'>
                <img
                    src={skill.imageUrl}
                    alt={skill.name}
                    className='object-contain w-16 h-16 md:w-22 md:h-22 xl:w-26 xl:h-26 filter group-hover:blur-[3px] group-hover:grayscale-[.7] transition duration-300 ease-in-out m-4' />
            </div>

            <div className='absolute top-[1px] left-[1px] opacity-0 group-hover:opacity-80 transition duration-300 ease-in-out group-hover:bg-white/30 w-24 h-24 md:w-30 md:h-30 xl:w-34 xl:h-34 rounded-3xl z-0'>
                <div className='flex flex-col items-center justify-center h-full select-none'>
                    <p className='text-l font-bold text-black opacity-100'>{skill.name}</p>
                    {!!skill.topWorldRank && <p className='text-l font-bold text-black opacity-100'>Rank: {skill.topWorldRank}</p>}
                    {!!skill.score && <p className='text-l font-bold text-black opacity-100'>Score: {skill.score}</p>}
                </div>
            </div>
        </motion.div>
    )
}