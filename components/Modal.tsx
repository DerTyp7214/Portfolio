import { XMarkIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

type Props = {
  show: boolean
  onClose?: () => void
  children?: React.ReactNode
  title?: string
}

export default function Modal({ show, children, onClose, title }: Props) {
  const [isBrowser, setIsBrowser] = useState(false)
  const [internalVisible, setInternalVisible] = useState(show)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  useEffect(() => {
    if (show) {
      setInternalVisible(true)
    }
  }, [show])

  const close = () => {
    onClose?.()
  }

  return isBrowser && internalVisible
    ? ReactDOM.createPortal(
        <motion.div
          initial={{
            backdropFilter: show ? 'blur(0px)' : 'blur(8px)',
            backgroundColor: show ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,.2)',
          }}
          animate={{
            backdropFilter: show ? 'blur(8px)' : 'blur(0px)',
            backgroundColor: show ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,0)',
          }}
          onClick={close}
          transition={{ duration: 0.3 }}
          className='fixed top-0 left-0 w-full h-full z-50'>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{
              opacity: show ? 0 : 1,
              filter: show ? 'blur(20px)' : 'blur(0px)',
            }}
            animate={{
              opacity: show ? 1 : 0,
              filter: show ? 'blur(0px)' : 'blur(20px)',
            }}
            onAnimationComplete={() => {
              if (show === false) {
                setInternalVisible(false)
              }
            }}
            transition={{ duration: 0.3 }}
            className='modal-content fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-secondaryBackground/80 rounded-2xl shadow-2xl shadow-black/50'>
            <XMarkIcon
              className='absolute top-3 right-3 w-8 h-8 cursor-pointer'
              onClick={close}
            />
            <h1 className='text-3xl font-bold text-white ml-4 mt-2 absolute'>
              {title}
            </h1>
            <div className='w-full h-full flex flex-col items-center justify-center overflow-hidden pt-20'>
              {children}
            </div>
          </motion.div>
        </motion.div>,
        document.getElementById('modal-root') as HTMLElement
      )
    : null
}
