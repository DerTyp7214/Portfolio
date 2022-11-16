import { motion } from 'framer-motion'
import React from 'react'

type Props = {}

export default function BackgroundCircles({ }: Props) {
    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                scale: [1, 2, 2, 3, 1],
                opacity: [.1, .2, .4, .8, .1, 1],
                borderRadius: ['20%', '20%', '50%', '80%', '20%'],
            }}
            transition={{
                duration: 2.5,
            }}
            className='relative flex justify-center items-center'>
            <motion.div className='absolute border border-secondaryBackground/60 rounded-full h-[200px] w-[200px] mt-52 animate-ping' />
            <motion.div className='absolute border border-secondaryBackground/10 rounded-full h-[300px] w-[300px] mt-52' />
            <motion.div className='absolute border border-secondaryBackground/20 rounded-full h-[500px] w-[500px] mt-52' />
            <motion.div className='absolute border border-accent rounded-full opacity-20 h-[650px] w-[650px] mt-52 animate-pulse ' />
            <motion.div className='absolute border border-secondaryBackground/25 rounded-full h-[800px] w-[800px] mt-52' />
        </motion.div>
    )
}