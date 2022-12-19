import { CSSProperties, useEffect, useState } from 'react'
import { useAppContext } from './appContext'

function telegramChat({
  chatLink,
  commentLimit,
  height,
  width,
  darkMode,
}: {
  chatLink: string
  commentLimit?: number
  height?: number
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
  params.set('height', (height ?? 500).toString())
  url.search = params.toString()

  return (
    <iframe
      src={url.toString()}
      height={height ?? '100%'}
      width={width ?? '100%'}
      className='border-none min-w-[320px]'
    />
  )
}

type TelegramChatType = {
  className?: string
  style?: CSSProperties
  chatLink: string
}

function TelegramChat({ className, style, chatLink }: TelegramChatType) {
  const [isSSR, setIsSSR] = useState(true)
  const { darkMode } = useAppContext()

  useEffect(() => {
    setIsSSR(false)
  }, [])

  return (
    <div style={style} className={className}>
      {!isSSR
        ? telegramChat({
            chatLink,
            darkMode,
          })
        : null}
    </div>
  )
}

export default TelegramChat
