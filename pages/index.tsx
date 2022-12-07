/* eslint-disable @next/next/no-img-element */
import { ArrowUpIcon } from '@heroicons/react/24/solid'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next/types'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import ReactTooltip from 'react-tooltip'
import About from '../components/About'
import ContactMe from '../components/ContactMe'
import Header from '../components/Header'
import Profile from '../components/Profile'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import {
  CodersRankBadge,
  ContactInfo,
  GitHubContributions,
  PageInfo,
  ProfileInfo,
  Project,
  Skill,
  Social
} from '../types/types'
import { lerpColor } from '../utils/colorUtils'
import fetchBadges from '../utils/fetchBadges'
import fetchContactInfo from '../utils/fetchContactInfo'
import fetchGithubContributions from '../utils/fetchGithubContributions'
import fetchPageInfo from '../utils/fetchPageInfo'
import fetchProfileInfo from '../utils/fetchProfile'
import fetchProjects from '../utils/fetchProjects'
import fetchSkills from '../utils/fetchSkills'
import fetchSocials from '../utils/fetchSocials'
import { getFormatedDate } from '../utils/stringUtils'

import 'react-toastify/dist/ReactToastify.css'

type Props = {
  pageInfo: PageInfo
  socials: Social[]
  profileInfo: ProfileInfo
  projects: Project[]
  skills: Skill[]
  contactInfo: ContactInfo
  contributions: GitHubContributions
  badges: CodersRankBadge[]
}

export default function Home({
  pageInfo,
  socials,
  profileInfo,
  projects,
  skills,
  contactInfo,
  contributions,
  badges,
}: Props) {
  const [darkMode, setDarkMode] = useState(true)
  const [scrollPosition, setScrollPosition] = useState(0)

  const versionInfo = (
    <div className='mb-1 mr-2 text-right text-sm opacity-60 dark:opacity-20'>
      <p>
        <Link
          target='_blank'
          href={
            process.env.NEXT_PUBLIC_GIT_HASH
              ? `https://github.com/DerTyp7214/Portfoio/commit/${process.env.NEXT_PUBLIC_GIT_HASH}`
              : 'https://github.com/DerTyp7214/Portfoio/tree/main'
          }>
          {getFormatedDate(new Date())}
        </Link>
      </p>
      <p>
        {require('../package.json').version} (
        <Link
          target='_blank'
          className='underline p-1'
          href={
            process.env.NEXT_PUBLIC_RUN_ID
              ? `https://github.com/DerTyp7214/Portfoio/actions/runs/${process.env.NEXT_PUBLIC_RUN_ID}`
              : 'https://github.com/DerTyp7214/Portfoio/actions'
          }>
          {process.env.NEXT_PUBLIC_RUN_ID ?? 'actions'}
        </Link>
        )
      </p>
    </div>
  )

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div
        className='h-screen bg-background dark:bg-backgroundDark text-black dark:text-white overflow-y-scroll scroll-smooth overflow-x-hidden z-0 customScroll selection:bg-accent/40 dark:selection:bg-accentDark/40 selection:text-black/90'
        style={{
          backgroundPositionX: '50%',
          backgroundPositionY: -scrollPosition * 0.04 + 'px',
          backgroundImage: darkMode
            ? 'url(/assets/pattern-dark.svg)'
            : 'url(/assets/pattern.svg)',
        }}
        onScroll={(event) => {
          setScrollPosition(event.currentTarget.scrollTop)
        }}>
        <Head>
          <title>{pageInfo.title}</title>
          <link rel='icon' href={pageInfo.favIconUrl} />

          <meta name='og:title' content={pageInfo.title} />
          <meta name='og:image' content={pageInfo.ogImageUrl} />
          <meta name='og:url' content={process.env.NEXT_PUBLIC_BASE_URL} />
          {pageInfo.description && (
            <meta name='og:description' content={pageInfo.description} />
          )}

          <meta
            name='theme-color'
            media='(prefers-color-scheme: light)'
            content={process.env.NEXT_PUBLIC_COLOR_ACCENT}
          />
          <meta
            name='theme-color'
            media='(prefers-color-scheme: dark)'
            content={process.env.NEXT_PUBLIC_COLOR_BACKGROUND}
          />
        </Head>
        <Header
          socials={socials}
          darkMode={darkMode}
          onDarkModeChange={(darkMode) => setDarkMode(darkMode)}
        />

        <section id='profile' className='snap-center mb-20'>
          <Profile profileInfo={profileInfo} />
        </section>

        <section id='about' className='snap-center mt-20 mb-20'>
          <About profileInfo={profileInfo} />
        </section>

        <section id='projects' className='snap-center mt-20 mb-20'>
          <Projects projects={projects} />
        </section>

        <section id='skills' className='snap-start mt-20 mb-20'>
          <Skills
            skills={skills}
            gitHubContributions={contributions}
            badges={badges}
          />
        </section>

        <section id='contact' className='snap-start mt-20'>
          <ContactMe contactInfo={contactInfo} />
        </section>

        <footer className='sticky bottom-0 z-50 w-min m-auto'>
          <div className='flex items-center justify-center pb-5'>
            <Link
              href='#profile'
              className='h-10 w-10 rounded-full hover:h-11 hover:w-11 transition-all overflow-hidden'>
              <ArrowUpIcon className='filter text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white transition-all duration-300 cursor-pointer' />
            </Link>
          </div>
        </footer>
        <div className='absolute bottom-0 right-1 hidden lg:block'>
          {versionInfo}
        </div>
        <div className='block lg:hidden'>{versionInfo}</div>
        <div id='modal-root'></div>
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
        <ToastContainer
          position='bottom-right'
          autoClose={5000}
          progressStyle={{
            background: darkMode
              ? process.env.NEXT_PUBLIC_COLOR_TERTIARY_DARK
              : process.env.NEXT_PUBLIC_COLOR_TERTIARY,
          }}
          toastStyle={{
            background: `${lerpColor(
              (darkMode
                ? process.env.NEXT_PUBLIC_COLOR_BACKGROUND_DARK
                : process.env.NEXT_PUBLIC_COLOR_BACKGROUND) ?? '#1e1e1e',
              (darkMode
                ? process.env.NEXT_PUBLIC_COLOR_ACCENT_DARK
                : process.env.NEXT_PUBLIC_COLOR_ACCENT) ?? '#FFFFFF',
              0.1
            )}80`,
            borderRadius: '1rem',
            paddingRight: '10px',
            backdropFilter: 'blur(20px)',
          }}
          toastClassName='transition-all duration-200 m-2'
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
          closeButton={false}
          bodyClassName='text-black dark:text-white'
          theme={darkMode ? 'dark' : 'light'}
        />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pageInfo: PageInfo = await fetchPageInfo()
  const socials: Social[] = await fetchSocials()
  const profileInfo: ProfileInfo = await fetchProfileInfo()
  const projects: Project[] = await fetchProjects()
  const skills: Skill[] = await fetchSkills()
  const contactInfo: ContactInfo = await fetchContactInfo()
  const badges: CodersRankBadge[] = await fetchBadges()
  const contributions: GitHubContributions = await fetchGithubContributions()

  return {
    props: {
      pageInfo,
      socials,
      profileInfo,
      projects,
      skills,
      contactInfo,
      contributions,
      badges,
    },
  }
}
