import { useEffect, useState } from 'react'

type Props = {
  children?: JSX.Element | (JSX.Element | null)[] | null
}

function RenderOnMount({ children }: Props) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted ? <>{children}</> : null
}

export default RenderOnMount
