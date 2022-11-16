import { motion } from 'framer-motion'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ContactInfo } from '../types/types'


type Props = {
    contactInfo: ContactInfo
}

type Inputs = {
    name: string,
    email: string,
    subject: string,
    message: string
}

export default function ContactMe({ contactInfo }: Props) {
    const { register, handleSubmit } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (formData) => {
        window.location.href = `mailto:${contactInfo.email}?subject=${formData.subject}&body=Hi, my name is ${formData.name}. ${formData.message} (${formData.email})`
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className='h-screen flex flex-col relative text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center'>
            <h3 className='absolute top-24 uppercase tracking-[20px] text-gray-500 text-2xl'>
                Contact
            </h3>

            <div className='flex flex-col space-y-10'>
                <h4 className='text-4xl font-semibold text-center'>
                    Contact <span className='decoration-accent/50 underline'>Me.</span>
                </h4>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='flex flex-col space-y-2 w-fit mx-auto' >
                    <div className='flex space-x-2'>
                        <input {...register('name')} className='contactInput' type='text' placeholder='Name' />
                        <input {...register('email')} className='contactInput' type='email' placeholder='Email' />
                    </div>

                    <input {...register('subject')} className='contactInput' type='text' placeholder='Subject' />

                    <textarea {...register('message')} className='contactInput' placeholder='Message' />

                    <button
                        type='submit'
                        className='bg-accent py-5 px-10 rounded-md text-black font-bold text-lg transition-all hover:bg-accent/80 active:bg-accent/60'>
                        Submit
                    </button>
                </form>
            </div>
        </motion.div>
    )
}
