import { useLottie } from 'lottie-react'
import { useEffect } from 'react'

type Props = {
  animationData: { [key: string]: any }
  speed?: number
  state?: 0 | 1
}

export default function AnimatedIcon({
  animationData,
  speed = 1,
  state,
  className,
  onClick,
  ...props
}: Props & React.HTMLAttributes<HTMLElement>) {
  const { View, play, setSpeed, setDirection } = useLottie({
    animationData,
    loop: false,
    className,
  })

  useEffect(() => {
    if (state === 1) setDirection(-1)
    else if (state === 0) setDirection(1)

    setSpeed(speed)
    play()
  }, [play, setDirection, setSpeed, speed, state])

  return (
    <div
      className='cursor-pointer relative select-none transition-all duration-200'
      onClick={onClick}
      {...props}>
      {View}
    </div>
  )
}
