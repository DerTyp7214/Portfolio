import { HomeIcon } from '@heroicons/react/24/outline'
import DOMPurify from 'isomorphic-dompurify'
import Link from 'next/link'
import { GetStaticProps } from 'next/types'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import BaseHeader from '../../components/BaseHeader'
import Chip from '../../components/Chip'
import RenderOnMount from '../../components/RenderOnMount'
import { useAppContext } from '../../components/appContext'
import RboardIcon from '../../svgs/RboardIcon.svg'
import RboardThemeCreatorIcon from '../../svgs/RboardThemeCreatorIcon.svg'
import RboardThemePatcherIcon from '../../svgs/RboardThemePatcherIcon.svg'
import RepositoryIcon from '../../svgs/RepositoryIcon.svg'
import TelegramIcon from '../../svgs/TelegramIcon.svg'
import XDAIcon from '../../svgs/XDAIcon.svg'
import { PageInfo, RboardData } from '../../types/types'
import { lerpColor } from '../../utils/colorUtils'
import { ParseLocation } from '../../utils/customRouteHandler'
import fetchPageInfo from '../../utils/fetchPageInfo'
import fetchRboardData from '../../utils/fetchRboardData'

type Props = {
  rboardData: RboardData
}

function getIcon(icon?: string, props: any = {}) {
  switch (icon) {
    case 'TelegramIcon':
      return <TelegramIcon {...props} />
    case 'XDAIcon':
      return <XDAIcon {...props} />
    case 'RepositoryIcon':
      return <RepositoryIcon {...props} />
    case 'RboardIcon':
      return <RboardIcon {...props} />
    case 'RboardThemeCreatorIcon':
      return <RboardThemeCreatorIcon {...props} />
    case 'RboardThemePatcherIcon':
      return <RboardThemePatcherIcon {...props} />
    default:
      return <></>
  }
}

function Rboard({
  rboardData: { title, description, icon, chips, projects },
}: Props) {
  const { darkMode } = useAppContext()

  const buildProjectClass = () => {
    const width = 'w-1/3 min-w-[250px]'
    const text = 'text-background dark:text-backgroundDark'
    const background = 'bg-accent/90 dark:bg-accentDark/90'
    const backgroundHover = 'hover:bg-accent hover:dark:bg-accentDark'
    const rounded =
      'rounded-2xl lg:first:rounded-l-[35px] lg:last:rounded-r-[35px]'
    const padding = 'p-5'
    const transition = 'transition-all duration-200'
    const snap = 'snap-center'
    const cursor = 'cursor-pointer'

    return `${width} ${text} ${background} ${backgroundHover} ${rounded} ${padding} ${transition} ${snap} ${cursor}`
  }

  const buildContentClass = (optional?: string) => {
    const width = 'w-full'
    const display = 'flex'
    const space = 'space-x-4'
    const padding = 'p-2'
    const max = 'max-w-screen-2xl'
    const margin = 'm-auto'
    const snap = 'snap-x snap-mandatory'
    const overflow = 'overflow-x-auto scrollbar-none'

    return `${width} ${display} ${space} ${padding} ${max} ${margin} ${snap} ${overflow} ${optional}`
  }

  const buildDescriptionWrapperClass = (optional?: string) => {
    const width = 'w-full'
    const display = 'flex'
    const direction = 'flex-col'
    const padding = 'p-5'
    const max = 'max-w-screen-2xl'
    const margin = 'm-auto'

    return `${width} ${display} ${direction} ${padding} ${max} ${margin} ${optional}`
  }

  const buildDescriptionWrapper = (description: string) => {
    const transition = 'transition-all duration-200'

    const wrapperClass = `${transition}`
    const descriptionClass =
      'description text-md text-lg md:text-xl lg:text-2xl ml-[1em]'

    const wrapper = (
      <div className={wrapperClass}>
        <style jsx global>{`
          .description h1 {
            margin-top: 3em;
            font-size: 1.5em;
            font-weight: 500;
          }
          .description h1::before {
            content: '•';
            color: ${darkMode
              ? process.env.NEXT_PUBLIC_COLOR_TERTIARY_DARK
              : process.env.NEXT_PUBLIC_COLOR_TERTIARY};
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: -1em;
          }
          :target .description h1 {
            underline-offset: 0.5em;
            text-decoration: underline;
            text-decoration-color: ${darkMode
              ? process.env.NEXT_PUBLIC_COLOR_ACCENT_DARK
              : process.env.NEXT_PUBLIC_COLOR_ACCENT};
          }
          .description h2 {
            margin-top: 1em;
            margin-bottom: 0.25em;
            font-size: 1.25em;
            font-weight: 400;
          }
          .description h3 {
            font-size: 1em;
            font-weight: 400;
          }
          .description ol {
            font-size: 0.875em;
            font-weight: 400;
          }
          .description li {
            font-size: 0.875em;
            font-weight: 400;
          }
          .description li::before {
            content: '•';
            color: ${darkMode
              ? process.env.NEXT_PUBLIC_COLOR_ACCENT_DARK
              : process.env.NEXT_PUBLIC_COLOR_ACCENT};
            font-weight: bold;
            display: inline-block;
            width: 1em;
            margin-left: 1em;
          }
        `}</style>
        <div
          className={descriptionClass}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
        />
      </div>
    )

    return wrapper
  }

  return (
    <>
      <BaseHeader
        leftContent={
          <Link href={ParseLocation('/', '#projects')}>
            <HomeIcon className='w-12 h-12 p-[7px] cursor-pointer opacity-50 dark:opacity-60 hover:scale-125 hover:opacity-100 dark:hover:opacity-100 transition-all duration-200' />
          </Link>
        }
      />

      <div className='mt-4 font-kulimPark'>
        {getIcon(icon, { className: 'w-24 h-24 m-auto' })}
        <h1 className='text-5xl tracking-[15px] text-center w-auto mt-2'>
          {title}
        </h1>
        <h2 className='text-md tracking-[1px] text-center w-auto mt-5 text-accent dark:text-accentDark'>
          {description.toUpperCase()}
        </h2>
      </div>
      <div className={buildContentClass('mt-4')}>
        {projects.map((project) => (
          <Link
            key={project.title}
            className={buildProjectClass()}
            href={`/projects/${project.id}`}>
            {getIcon(project.icon, { className: 'w-24 h-24 m-auto' })}
            <h1 className='text-xl text-center w-auto mt-2'>{project.title}</h1>
            <h2 className='text-md text-center w-auto mt-5'>
              {project.description}
            </h2>
          </Link>
        ))}
      </div>
      <div className={buildContentClass()}>
        {chips.map((chip) => (
          <Chip
            key={chip.text}
            text={chip.text}
            icon={getIcon(chip.icon)}
            href={chip.href}
            className='min-w-[250px] snap-center'
            fullWidth
          />
        ))}
      </div>
      <div className={buildDescriptionWrapperClass('mt-4')}>
        {projects.map((project) => (
          <div key={project.title} className='mt-4' id={project.shortId}>
            {project.longDescription
              ? buildDescriptionWrapper(project.longDescription)
              : null}
          </div>
        ))}
      </div>
      <RenderOnMount>
        <ReactTooltip
          style={{
            backgroundColor: lerpColor(
              (darkMode
                ? process.env.NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND_DARK
                : process.env.NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND) ??
                '#434d57',
              darkMode ? '#FFFFFF' : '#000000',
              0.1
            ),
            color: darkMode ? '#FFFFFF' : '#000000',
          }}
          className='max-w-[200px] text-center'
        />
      </RenderOnMount>
    </>
  )
}

export default Rboard

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await fetchPageInfo('rboard')
  const rboardData: RboardData = await fetchRboardData()

  return {
    props: {
      pageInfo,
      rboardData,
    },
  }
}
