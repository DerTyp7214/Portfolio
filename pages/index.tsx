/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next/types'
import {
  CodersRankActivities,
  CodersRankBadge,
  ContactInfo,
  GitHubContributions,
  PageInfo,
  ProfileInfo,
  Project,
  Skill,
  Social,
} from '../types/types'
import { ArrowUpIcon } from '@heroicons/react/24/solid'
import { ToastContainer } from 'react-toastify'
import About from '../components/About'
import ContactMe from '../components/ContactMe'
import Header from '../components/Header'
import Profile from '../components/Profile'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import fetchContactInfo from '../utils/fetchContactInfo'
import fetchPageInfo from '../utils/fetchPageInfo'
import fetchProfileInfo from '../utils/fetchProfile'
import fetchProjects from '../utils/fetchProjects'
import fetchSkills from '../utils/fetchSkills'
import fetchSocials from '../utils/fetchSocials'
import fetchBadges from '../utils/fetchBadges'
import ReactTooltip from 'react-tooltip'
import fetchGithubContributions from '../utils/fetchGithubContributions'

import 'react-toastify/dist/ReactToastify.css'
import { getFormatedDate } from '../utils/stringUtils'

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
  return (
    <div className='h-screen bg-background text-white overflow-y-scroll scroll-smooth overflow-x-hidden z-0 customScroll'>
      <Head>
        <title>{pageInfo.title}</title>
        <link rel='icon' href={pageInfo.favIconUrl} />

        <meta name='og:title' content={pageInfo.title} />
        <meta name='og:description' content={pageInfo.description} />
        <meta name='og:image' content={pageInfo.ogImageUrl} />
        <meta name='og:url' content={process.env.NEXT_PUBLIC_BASE_URL} />
      </Head>

      <Header socials={socials} />

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

      <footer className='sticky bottom-0 w-full z-50'>
        <div className='flex items-center justify-center pb-5'>
          <Link
            href='#profile'
            className='h-10 w-10 rounded-full hover:h-11 hover:w-11 transition-all overflow-hidden'>
            <ArrowUpIcon className='filter text-white/30 hover:text-white transition-all duration-300 cursor-pointer' />
          </Link>
        </div>
        <div className='absolute bottom-1 right-2 text-right text-sm opacity-20'>
          <p>
            <Link
              target='_blank'
              href={
                process.env.NEXT_PUBLIC_RUN_ID
                  ? `https://github.com/DerTyp7214/Portfoio/actions/runs/${process.env.NEXT_PUBLIC_RUN_ID}`
                  : 'https://github.com/DerTyp7214/Portfoio/actions'
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
                process.env.NEXT_PUBLIC_GIT_HASH
                  ? `https://github.com/DerTyp7214/Portfoio/commit/${process.env.NEXT_PUBLIC_GIT_HASH}`
                  : 'https://github.com/DerTyp7214/Portfoio/tree/main'
              }>
              {process.env.NEXT_PUBLIC_GIT_HASH_SHORT ?? 'main'}
            </Link>
            )
          </p>
        </div>
      </footer>
      <div id='modal-root'></div>
      <ReactTooltip
        html
        backgroundColor='#56606b'
        multiline
        className='max-w-[200px] text-center'
      />
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        progressStyle={{ background: '#ff7ef9' }}
        toastStyle={{
          background: '#2f373f80',
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
        theme='dark'
      />
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
