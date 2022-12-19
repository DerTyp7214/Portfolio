/* eslint-disable @next/next/no-img-element */
type Props = {
  icon?: React.ReactNode | string
  text: string
  onClick?: () => void
  href?: string
  fullWidth?: boolean
  className?: string
}

function Chip({ icon, text, onClick, href, fullWidth, className }: Props) {
  const Icon: () => JSX.Element = () => {
    if (typeof icon === 'string')
      return <img src={icon} className='w-9 h-9 mr-2' alt='' />

    if ((icon as any).$$typeof === Symbol.for('react.element'))
      return (
        <div className='w-9 h-9 ml-2 mr-2'>
          {{
            ...(icon as any),
            props: {
              ...(icon as any).props,
              style: {
                width: '100%',
                height: '100%',
                ...((icon as any).props?.style ?? {}),
              },
            },
          }}
        </div>
      )

    return <></>
  }

  const divClassName = `flex items-center justify-between rounded-full bg-secondaryBackground/60 dark:bg-secondaryBackgroundDark/60 hover:bg-secondaryBackground hover:dark:bg-secondaryBackgroundDark cursor-pointer ${
    fullWidth ? 'w-full pr-9' : 'w-auto'
  } transition-all duration-200 ${className ?? ''}`

  return (
    <div
      className={divClassName}
      onClick={onClick ?? (() => window.open(href, '_blank'))}>
      <Icon />
      <div className='text-sm font-medium mr-3 w-full text-center tracking-wide'>
        {text}
      </div>
    </div>
  )
}

export default Chip
