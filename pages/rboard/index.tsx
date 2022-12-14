import { HomeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { GetStaticProps } from 'next/types'
import { CSSProperties, useEffect, useState } from 'react'
import { useAppContext } from '../../components/appContext'
import BaseHeader from '../../components/BaseHeader'
import { PageInfo } from '../../types/types'
import fetchPageInfo from '../../utils/fetchPageInfo'

type Props = {}

function telegramChat({
  chatLink,
  commentLimit,
  height,
  width,
  darkMode,
}: {
  chatLink: string
  commentLimit?: number
  height: number
  width?: number
  darkMode: boolean
}) {
  const url = new URL(`https://t.me/${chatLink}`)
  const params = new URLSearchParams(url.search)
  params.set('embed', '1')
  params.set('discussion', '1')
  params.set('comments_limit', commentLimit?.toString() ?? '5')
  params.set(
    'color',
    (darkMode
      ? process.env.NEXT_PUBLIC_COLOR_ACCENT_DARK
      : process.env.NEXT_PUBLIC_COLOR_ACCENT
    )?.replace('#', '') ?? '39C4E8'
  )
  params.set('dark', darkMode ? '1' : '0')
  params.set('height', height.toString())
  url.search = params.toString()

  return (
    <iframe
      src={url.toString()}
      height={height}
      width={width ?? '100%'}
      className='border-none min-w-[320px]'
    />
  )
}

type ChatWrapperType = { className?: string; style?: CSSProperties }

function Rboard({}: Props) {
  const [isSSR, setIsSSR] = useState(true)
  const { darkMode } = useAppContext()

  const chatWrapper = (
    chatLink: string,
    { className, style }: ChatWrapperType | undefined = {}
  ) => (
    <div
      style={style}
      className={`p-4 w-min bg-secondaryBackground dark:bg-secondaryBackgroundDark rounded-xl ${className}`}>
      {!isSSR
        ? telegramChat({
            chatLink,
            height: 500,
            darkMode,
          })
        : null}
    </div>
  )

  const TelegramGeneralChat = (props: ChatWrapperType) =>
    chatWrapper('gboardthemes/1', props)

  const TelegramThemesChat = (props: ChatWrapperType) =>
    chatWrapper('gboardthemes/320750', props)

  useEffect(() => {
    setIsSSR(false)
  }, [])

  return (
    <>
      <BaseHeader
        leftContent={
          <Link href='/#projects'>
            <HomeIcon className='w-12 h-12 p-[7px] cursor-pointer opacity-50 dark:opacity-60 hover:scale-125 hover:opacity-100 dark:hover:opacity-100 transition-all duration-200' />
          </Link>
        }
      />

      {/*
        under construction text
        TODO: remove when ready
        TODO: show all rboard related stuff
        */}
      <div className='text-center text-2xl font-bold text-primaryText dark:text-primaryTextDark'>
        Under construction
      </div>
      <div className='w-full flex justify-between p-2'>
        <TelegramGeneralChat />
        <TelegramThemesChat />
      </div>
    </>
  )
}

export default Rboard

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await fetchPageInfo()

  return {
    props: {
      pageInfo,
    },
  }
}
