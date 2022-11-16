import { motion } from 'framer-motion'
import React from 'react'
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
            className='relative h-screen flex flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center'>
            <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
                About
            </h3>

            <motion.img
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
                src={profileInfo.avatarUrl}
                className='-mb-20 md:mb-0 flex-shrink-0 w-56 h-56 rounded-full object-cover md:rounded-lg md:w-64 md:h-95 xl:w-[500px] xl:h-[600px]'
            />

            <div className='space-y-10 px-0 md:px-10'>
                <h4 className='text-4xl font-semibold'>
                    Here is a <span className='underline decoration-accent/50'>little</span> background
                </h4>

                <p className='text-base'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus ex ac dui tincidunt, sed blandit sapien pulvinar. Integer porta vulputate erat, ac tristique felis suscipit a. Aenean pulvinar placerat diam, varius vehicula lacus feugiat sed. Maecenas ornare mauris diam, vitae blandit tellus faucibus vel. In in condimentum enim, id maximus ipsum. Etiam molestie maximus efficitur. Etiam nec turpis in lacus gravida fringilla. Maecenas a vulputate odio. Curabitur commodo placerat purus, quis ornare nulla porttitor tempor. Nunc quis neque viverra, vestibulum diam eu, mollis nisl. Sed sed neque nibh. Etiam vehicula auctor erat, eu ultrices massa lacinia eget. Donec fringilla tincidunt tincidunt. Nulla tincidunt elit neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                </p>
            </div>
        </motion.div>
    )
}