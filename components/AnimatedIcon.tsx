import { useEffect, useRef } from 'react'

const icons = ['sun', 'sun_outline']

type Icons = typeof icons[number]

type Props = {
  icon: Icons
  speed?: number
  autoplay?: boolean
  state?: number
  progressInterval?: number
  animationListener?: (progress: number) => void
}

const iconUrl = (icon: Icons, reversed: Boolean = false) =>
  `/assets/animatedIcons/${icon}-150x150${reversed ? '-reversed' : ''}.webm`

export default function AnimatedIcon({
  icon,
  speed = 1,
  autoplay,
  state,
  progressInterval = 1000 / 60,
  animationListener,
  ...props
}: Props & React.HTMLAttributes<HTMLVideoElement>) {
  const videoPlayerRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const videoPlayer = videoPlayerRef.current

    const playVideo = () => {
      if (videoPlayer) {
        videoPlayer.currentTime = 0
        videoPlayer.playbackRate = speed
        videoPlayer.play().catch(() => {
          videoPlayer.currentTime = videoPlayer.duration
        })
      }
    }

    const interval = setInterval(() => {
      if (videoPlayer) {
        const progress = videoPlayer.currentTime / videoPlayer.duration

        if (animationListener && !isNaN(progress)) {
          animationListener(progress)
        }

        if (progress >= 1) clearInterval(interval)
      } else clearInterval(interval)
    }, progressInterval)

    if (videoPlayer) {
      videoPlayer.addEventListener('loadeddata', playVideo)

      if (state === 0) {
        videoPlayer.src = iconUrl(icon)
      } else {
        videoPlayer.src = iconUrl(icon, true)
      }
    }

    return () => {
      if (videoPlayer) {
        videoPlayer.removeEventListener('loadeddata', playVideo)
        clearInterval(interval)
      }
    }
  }, [state, icon, speed, progressInterval, animationListener])

  return (
    <video
      {...props}
      ref={videoPlayerRef}
      autoPlay={autoplay}
      className={`cursor-pointer ${props.className ?? ''}`}></video>
  )
}
