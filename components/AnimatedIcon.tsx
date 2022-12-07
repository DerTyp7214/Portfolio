import { useEffect, useRef, useState } from 'react'

type Props = {
  animationLocation: string
  speed?: number
  state?: 0 | 1
}

export default function AnimatedIcon({
  animationLocation,
  speed = 1,
  state,
  className,
  onClick,
  ...props
}: Props & React.HTMLAttributes<HTMLElement>) {
  const lottiePlayer = useRef<HTMLElement>(null)

  const [playerElement, setPlayerElement] = useState<any>(null)

  useEffect(() => {
    const player = lottiePlayer.current as any

    if (player) {
      if (state === 1) player.setDirection(-1)
      else player.setDirection(1)

      player.setSpeed(speed)
      player.setLooping(false)
      player.play()
    }
  }, [speed, state])

  useEffect(() => {
    if (window) {
      require('@dotlottie/player-component')

      setPlayerElement(
        <dotlottie-player
          ref={lottiePlayer}
          src={animationLocation}
        />
      )
    }
  }, [animationLocation])

  return (
    <div
      className={`cursor-pointer relative select-none transition-all duration-200 ${className}`}
      onClick={onClick}
      {...props}>
      {playerElement}
    </div>
  )
}
