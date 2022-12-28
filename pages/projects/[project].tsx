/* eslint-disable @next/next/no-img-element */
import { HomeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetStaticProps } from 'next/types'
import { useState } from 'react'
import ReactTooltip from 'react-tooltip'
import { useAppContext } from '../../components/appContext'
import BaseHeader from '../../components/BaseHeader'
import RenderOnMount from '../../components/RenderOnMount'
import SkillModal from '../../components/SkillModal'
import { PageInfo, Project, Skill } from '../../types/types'
import { lerpColor } from '../../utils/colorUtils'
import { ParseLocation } from '../../utils/customRouteHandler'
import fetchPageInfo from '../../utils/fetchPageInfo'
import fetchProjects from '../../utils/fetchProjects'
import fetchSkills from '../../utils/fetchSkills'

type Props = {
  pageInfo: PageInfo
  projects: Project[]
  skills: Skill[]
}

function BlurredBachkgroundComponent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <div className='absolute left-0 top-[5px] sm:top-[10px] blur-[3px] sm:blur-[10px] opacity-50 scale-90 dark:brightness-200'>
        {children}
      </div>
      <div className='relative'>{children}</div>
    </div>
  )
}

const ProjectIcon = ({
  className,
  project,
}: {
  className: string
  project: Project
}) => (
  <BlurredBachkgroundComponent className={className}>
    <div
      style={{
        transitionProperty: 'width, height',
      }}
      className='w-12 h-12 rounded-lg sm:w-32 sm:h-32 sm:rounded-xl duration-200 overflow-hidden relative cursor-pointer mr-5 xl:rounded-3xl xl:w-[200px] xl:h-[200px]'>
      <img
        src={project.imageUrl}
        alt={project.name}
        className='absolute top-0 left-0 w-full h-full'
      />
    </div>
  </BlurredBachkgroundComponent>
)

function ProjectPage({ projects, skills }: Props) {
  const [showModal, ShowModal] = useState(false)

  const { darkMode } = useAppContext()

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
    <>
      <BaseHeader
        leftContent={
          <Link href={ParseLocation('/', '#projects')}>
            <HomeIcon className='w-12 h-12 p-[7px] cursor-pointer opacity-50 dark:opacity-60 hover:scale-125 hover:opacity-100 dark:hover:opacity-100 transition-all duration-200' />
          </Link>
        }
      />
      <SkillModal
        show={showModal}
        skill={currentSkill}
        onClose={() => ShowModal(false)}
      />
      <div className='p-2 m-auto mt-4 sm:mt-10 sm:flex sm:flex-row xl:justify-around max-w-screen-2xl'>
        <div className='flex flex-col space-y-5 sm:ml-10 sm:mt-10 sm:mr-10'>
          <div className='flex flex-col space-y-1 sm:space-y-0 sm:flex-row ml-1'>
            <ProjectIcon
              className='hidden sm:block xl:hidden'
              project={project}
            />
            <div>
              <h1 className='text-xl sm:text-2xl md:text-4xl xl:text-6xl'>
                {project.name}
              </h1>
              <p className='text-sm sm:text-lg md:text-xl xl:text-2xl fomt-bold mt-1 sm:space-x-2 flex flex-wrap flex-row text-tertiary dark:text-tertiaryDark'>
                <RenderOnMount>
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
                          <span key={b.toString()}>
                            <span className='hidden sm:block'>&</span>
                            <span className='block sm:hidden'>
                              &nbsp; &nbsp;
                            </span>
                          </span>,
                          b,
                        ] as any
                    )}
                </RenderOnMount>
              </p>
            </div>
          </div>

          <div
            className='flex text-center ml-2 lg:ml-1 customScroll overflow-auto pb-2'
            id='infos'>
            <style>{`
              #infos::-webkit-scrollbar {
                height: 4px;
              }
            `}</style>
            <ProjectIcon className='sm:hidden' project={project} />
            {!!project.downloads && (
              <div className='flex flex-col text-xs sm:text-md lg:text-lg justify-between pr-7 mt-2'>
                <span>{project.downloads}</span>
                <span className='opacity-60'>Downloads</span>
              </div>
            )}

            <RenderOnMount>
              {project.extraLinks?.map((link, index) => {
                return (
                  <Link
                    href={link.url}
                    target={link.url.startsWith('http') ? '_blank' : '_self'}
                    key={index}
                    id={link.name}
                    className='flex flex-col text-xs sm:text-md lg:text-lg justify-between pl-7 pr-7 cursor-pointer mt-2 before:bg-secondaryBackgroundDark/40 dark:before:bg-secondaryBackground/40'>
                    <style>{`
                    #${link.name} {
                      position: relative;
                    }
                    #${link.name}::before {
                      content: '';
                      display: block;
                      height: 24px;
                      left: 0;
                      position: absolute;
                      top: calc(50% - 12px);
                      width: 1px;
                    }
                  `}</style>
                    <img
                      src={link.iconUrl}
                      alt={link.name}
                      width={20}
                      height={20}
                      className={`m-auto h-[20px] ${link.className}`}
                    />
                    <span className='opacity-60'>{link.name}</span>
                  </Link>
                )
              })}
            </RenderOnMount>
          </div>

          <RenderOnMount>
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
          </RenderOnMount>

          <div className='flex my-2 pt-5 flex-wrap'>
            <RenderOnMount>
              {project.skills.map((skillName, index) => {
                const skill = skills.find((s) => s.name === skillName)
                if (!skill) return null
                return (
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
                )
              }) ?? null}
            </RenderOnMount>
          </div>

          <div className='pr-2'>
            <ul className='list-disc sapce-y-4 ml-5 text-lg'>
              <RenderOnMount>
                {project.keypoints.map((keypoint, index) => (
                  <li key={index}>{keypoint}</li>
                ))}
              </RenderOnMount>
            </ul>
          </div>

          <div className='flex flex-wrap pt-10'>
            <RenderOnMount>
              {projects
                .filter((p) => p.id !== project.id)
                .map((p, index) => (
                  <Link
                    key={index}
                    href={`/projects/${p.id}`}
                    className='flex flex-col items-center justify-center w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-3xl bg-secondaryBackground/50 dark:bg-secondaryBackgroundDark/50 relative cursor-pointer overflow-hidden m-2 transition-all duration-200 group'>
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className='absolute top-0 left-0 w-full h-full'
                    />
                    <span className='absolute font-bold text-xs sm:text-base lg:text-lg w-full h-full bottom-0 p-3 select-none bg-white/50 text-black backdrop-blur-[5px] z-30 transition-all ease-out duration-500 top-[100%] group-hover:top-0 rounded-none group-hover:rounded-3xl'>
                      {p.name}
                    </span>
                  </Link>
                ))}
            </RenderOnMount>
          </div>
        </div>

        <ProjectIcon className='hidden xl:block' project={project} />
      </div>
      <RenderOnMount>
        <ReactTooltip
          html
          backgroundColor={lerpColor(
            (darkMode
              ? process.env.NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND_DARK
              : process.env.NEXT_PUBLIC_COLOR_SECONDARY_BACKGROUND) ??
              '#434d57',
            darkMode ? '#FFFFFF' : '#000000',
            0.1
          )}
          textColor={darkMode ? '#FFFFFF' : '#000000'}
          multiline
          className='max-w-[200px] text-center'
        />
      </RenderOnMount>
    </>
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
  const skills: Skill[] = await fetchSkills()

  return {
    props: {
      pageInfo,
      projects,
      skills,
    },
  }
}
