import { motion } from 'framer-motion'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ContactInfo } from '../types/types'

type Props = {
  contactInfo: ContactInfo
}

type Inputs = {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactMe({ contactInfo }: Props) {
  const { register, handleSubmit } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    window.location.href = `mailto:${contactInfo.email}?subject=${formData.subject}&body=Hi, my name is ${formData.name}. ${formData.message} (${formData.email})`
  }

  return (
    <motion.div className='h-screen flex relative text-center flex-row max-w-[90vw] px-10 justify-evenly mx-auto items-start md:items-center'>
      <h3 className='absolute top-24 uppercase tracking-[20px] text-black/50 dark:text-white/30 text-2xl'>
        Contact
      </h3>

      <div className='flex flex-col space-y-10 mt-44 md:mt-32 lg:mt-16 xl:mt-8 2xl:mt-0 max-w-[90vw]'>
        <h4 className='text-4xl font-semibold text-center'>
          Contact{' '}
          <span className='decoration-accent/50 dark:decoration-accentDark/50 underline'>
            Me.
          </span>
        </h4>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col space-y-2 w-fit mx-auto max-w-[90vw]'>
          <div className='flex flex-col space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row'>
            <input
              {...register('name')}
              className='contactInput'
              type='text'
              placeholder='Name'
            />
            <input
              {...register('email')}
              className='contactInput'
              type='email'
              placeholder='Email'
            />
          </div>

          <input
            {...register('subject')}
            className='contactInput'
            type='text'
            placeholder='Subject'
          />

          <textarea
            {...register('message')}
            className='contactInput'
            placeholder='Message'
          />

          <button
            type='submit'
            className='bg-accent dark:bg-accentDark py-5 px-10 rounded-md text-white dark:text-black font-bold text-lg transition-all hover:bg-accent/80 active:bg-accent/60 dark:hover:bg-accentDark/80 dark:active:bg-accentDark/60'>
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  )
}
