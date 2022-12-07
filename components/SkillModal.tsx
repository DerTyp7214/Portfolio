import { ClipboardIcon } from '@heroicons/react/24/outline'
import { ShareIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'
import { Skill } from '../types/types'
import { capitalize } from '../utils/stringUtils'
import Modal from './Modal'

type Props = {
  skill: Skill | null
  show: boolean
  onClose: () => void
}

export default function SkillModal({ skill, show, onClose }: Props) {
  const currentEntries = Object.entries(skill ?? {}).filter(
    ([_, value]) =>
      value &&
      !value.toString().startsWith('http') &&
      !value.toString().startsWith('/images') &&
      value !== true &&
      value !== false
  )

  return (
    <Modal show={show && !!skill} onClose={onClose} title={skill?.name}>
      {skill && (
        <div className='flex flex-col items-center justify-start lg:justify-center p-4 h-full overflow-auto select-none'>
          <ShareIcon
            className='absolute top-4 right-14 w-6 h-6 cursor-pointer'
            onClick={() => {
              const shareData = {
                title: skill.name,
                text: `${window.location.origin}/?skill=${skill.name}#skills`,
              }
              if (navigator?.canShare?.(shareData)) {
                navigator.share(shareData)
                toast('Link shared', {
                  type: 'info',
                  icon: () => <ShareIcon className='h-6 w-6' />,
                })
              }
            }}
          />
          <ClipboardIcon
            className='absolute top-4 right-24 w-6 h-6 cursor-pointer'
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/?skill=${skill.name}#skills`
              )
              toast('Link copied to clipboard', {
                type: 'info',
                icon: () => <ClipboardIcon className='h-6 w-6' />,
              })
            }}
          />
          <h1 className='text-5xl font-bold text-black dark:text-white mb-10 underline decoration-accent/40 dark:decoration-accentDark/40'>
            {skill.name}
          </h1>
          <div className='grid grid-cols-2 space-x-4'>
            {currentEntries.map(([key, value]) => (
              <div
                key={key}
                className='flex flex-col items-center justify-center overflow-hidden'>
                <h1 className='text-3xl font-bold text-black dark:text-white'>
                  {value}
                </h1>
                <p className='text-black/60 dark:text-white/60 text-center'>
                  {capitalize(key.split(/(?=[A-Z])/).join(' '))}
                </p>
              </div>
            ))}
          </div>

          <div className='flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 items-center justify-center mt-10'>
            <button
              className='text-lg border-2 border-accent/20 dark:border-accentDark/20 rounded-3xl hover:border-accent/40 dark:hover:border-accentDark/40 hover:bg-accent/10 dark:hover:bg-accentDark/10 hover:rounded-2xl transition-all duration-200 p-2'
              onClick={() => {
                window.open(
                  `https://profile.codersrank.io/leaderboard/developer?technology=${skill.name}`,
                  '_blank'
                )
              }}>
              CodersRank Leaderboards (World)
            </button>
            <button
              className='text-lg border-2 border-accent/20 dark:border-accentDark/20 rounded-3xl hover:border-accent/40 dark:hover:border-accentDark/40 hover:bg-accent/10 dark:hover:bg-accentDark/10 hover:rounded-2xl transition-all duration-200 p-2'
              onClick={() => {
                window.open(
                  `https://profile.codersrank.io/leaderboard/developer?technology=${skill.name}&country=Germany`,
                  '_blank'
                )
              }}>
              CodersRank Leaderboards (Germany)
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}
