/* eslint-disable @next/next/no-img-element */
import { HomeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next/types'
import { useState } from 'react'
import BaseHeader from '../../components/BaseHeader'
import SkillModal from '../../components/SkillModal'
import { PageInfo, Project, Skill } from '../../types/types'
import fetchPageInfo from '../../utils/fetchPageInfo'
import fetchProjects from '../../utils/fetchProjects'

type Props = {
  pageInfo: PageInfo
  projects: Project[]
}

function BlurredBachkgroundComponent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  // draw children and blurred children as background
  return (
    <div className={`relative ${className}`}>
      <div className='absolute left-0 top-[10px] blur-[10px] opacity-50 scale-90 dark:brightness-200 hidden sm:block'>
        {children}
      </div>
      <div className='relative'>{children}</div>
    </div>
  )
}

function ProjectPage({ projects }: Props) {
  const [showModal, ShowModal] = useState(false)

  const [currentSkill, setCurrentSkill] = useState<Skill | null>(null)

  const {
    query: { project: projectId },
  } = useRouter()

  const project = projects.find((project) => project.id === projectId)

  const openModal = (skill: Skill) => {
    setCurrentSkill(skill)
    ShowModal(true)
  }

  if (!project) return <div>Project not found</div>

  return (
    <div>
      <BaseHeader
        leftContent={
          <Link href='/#projects'>
            <HomeIcon className='w-12 h-12 p-[7px] cursor-pointer opacity-50 dark:opacity-60 hover:scale-125 hover:opacity-100 dark:hover:opacity-100 transition-all duration-200' />
          </Link>
        }
      />
      <SkillModal
        show={showModal}
        skill={currentSkill}
        onClose={() => ShowModal(false)}
      />
      <div className='m-4 sm:m-10 sm:flex sm:flex-row xl:justify-around'>
        <div className='flex flex-col space-y-5 sm:ml-10 sm:mt-10 sm:mr-10'>
          <div className='flex flex-col space-y-1 sm:space-y-0 sm:flex-row ml-1'>
            <BlurredBachkgroundComponent className='block xl:hidden'>
              <div
                style={{
                  transitionProperty: 'width, height',
                }}
                className='w-16 h-16 sm:w-32 sm:h-32 rounded-xl duration-200 overflow-hidden relative cursor-pointer mr-5'>
                <img
                  src={project.imageUrl}
                  alt={project.name}
                  className='absolute top-0 left-0 w-full h-full'
                />
              </div>
            </BlurredBachkgroundComponent>
            <div>
              <h1 className='text-xl sm:text-2xl md:text-4xl xl:text-6xl'>
                {project.name}
              </h1>
              <p className='text-sm sm:text-lg md:text-xl xl:text-2xl fomt-bold mt-1 sm:space-x-2 flex flex-wrap flex-col sm:flex-row text-tertiary dark:text-tertiaryDark'>
                {project.authors
                  .map((author, index) => (
                    <Link
                      key={index}
                      href={`https://github.com/${author}`}
                      target='_blank'>
                      {author}
                    </Link>
                  ))
                  .reduce(
                    (a, b) =>
                      [
                        a,
                        <>
                          <span key={b.toString()} className='hidden sm:block'>
                            &
                          </span>
                        </>,
                        b,
                      ] as any
                  )}
              </p>
            </div>
          </div>

          <div className='flex text-center ml-2 lg:ml-1 flex-wrap'>
            {!!project.downloads && (
              <div className='flex flex-col text-xs sm:text-md lg:text-lg justify-between mr-10 mt-2'>
                <span>{project.downloads}</span>
                <span className='opacity-60'>Downloads</span>
              </div>
            )}

            {project.extraLinks?.map((link, index) => {
              return (
                <Link
                  href={link.url}
                  target='_blank'
                  key={index}
                  className='flex flex-col text-xs sm:text-md lg:text-lg justify-between mr-10 cursor-pointer mt-2'>
                  <img
                    src={link.iconUrl}
                    alt={link.name}
                    width={20}
                    height={20}
                    className='m-auto'
                  />
                  <span className='opacity-60'>{link.name}</span>
                </Link>
              )
            })}
          </div>

          <div className='flex flex-col sm:flex-row space-y-2 space-x-0 sm:space-y-0 sm:space-x-4'>
            {project.downloadUrl && (
              <button
                onClick={() => window.open(project.downloadUrl)}
                className='rounded-lg bg-accent/80 text-white dark:bg-accentDark/80 dark:text-black pt-1 pb-1 pl-3 pr-3 hover:bg-accent/100 dark:hover:bg-accentDark/100 transition-all duration-200 overflow-hidden'>
                Download
              </button>
            )}
            {project.alternativeDownload?.url && (
              <button
                onClick={() => window.open(project.alternativeDownload?.url)}
                className='rounded-lg bg-accent/80 text-white dark:bg-accentDark/80 dark:text-black pt-1 pb-1 pl-3 pr-3 hover:bg-accent/100 dark:hover:bg-accentDark/100 transition-all duration-200 overflow-hidden'>
                {project.alternativeDownload?.name}
              </button>
            )}
            {project.playStoreUrl && (
              <button
                onClick={() => window.open(project.playStoreUrl)}
                className='rounded-lg bg-accent/80 text-white dark:bg-accentDark/80 dark:text-black pt-1 pb-1 pl-3 pr-3 hover:bg-accent/100 dark:hover:bg-accentDark/100 transition-all duration-200 overflow-hidden'>
                PlayStore
              </button>
            )}
          </div>

          <div className='flex my-2 pt-5 flex-wrap'>
            {project.skills.map((skill, index) => (
              <div
                key={index}
                onClick={() => openModal(skill)}
                className='m-1 h-12 w-12 rounded-[5px] bg-secondaryBackground/50 dark:bg-secondaryBackgroundDark/50 relative flex justify-center items-center cursor-pointer'>
                <img
                  className='p-2 filter z-20 absolute top-0 left-0 w-full h-full'
                  src={skill.imageUrl}
                  alt={skill.name}
                />
                <div className='absolute top-0 left-0 w-full h-full peer z-40' />
                <span className='absolute p-1 top-[-30%] select-none rounded-[5px] opacity-0 peer-hover:opacity-100 transition-all bg-white/50 text-black backdrop-blur-[5px] z-30'>
                  {skill.name}
                </span>
              </div>
            ))}
          </div>

          <div className='pr-2'>
            <ul className='list-disc sapce-y-4 ml-5 text-lg'>
              {project.keypoints.map((keypoint, index) => (
                <li key={index}>{keypoint}</li>
              ))}
            </ul>
          </div>
        </div>

        <BlurredBachkgroundComponent className='hidden xl:block'>
          <div
            style={{
              transitionProperty: 'width, height',
            }}
            className='rounded-3xl w-[200px] h-[200px] duration-200 overflow-hidden relative cursor-pointer'>
            <img
              src={project.imageUrl}
              alt={project.name}
              className='absolute top-0 left-0 w-full h-full'
            />
          </div>
        </BlurredBachkgroundComponent>
      </div>
    </div>
  )
}

export default ProjectPage

export const getStaticPaths = async () => {
  const projects: Project[] = await fetchProjects()

  const paths = projects.map((project) => ({
    params: { project: project.id },
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await fetchPageInfo()
  const projects: Project[] = await fetchProjects()

  return {
    props: {
      pageInfo,
      projects,
    },
  }
}
