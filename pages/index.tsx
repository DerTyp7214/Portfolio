/* eslint-disable @next/next/no-img-element */
import { ArrowUpIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { GetStaticProps } from 'next/types'
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
import fetchBadges from '../utils/fetchBadges'
import fetchContactInfo from '../utils/fetchContactInfo'
import fetchGithubContributions from '../utils/fetchGithubContributions'
import fetchPageInfo from '../utils/fetchPageInfo'
import fetchProfileInfo from '../utils/fetchProfile'
import fetchProjects from '../utils/fetchProjects'
import fetchSkills from '../utils/fetchSkills'
import fetchSocials from '../utils/fetchSocials'

import 'react-toastify/dist/ReactToastify.css'
import { useAppContext } from '../components/appContext'

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
  const { darkMode } = useAppContext()

  return (
    <div>
      <Header socials={socials} />

      <section id='profile' className='snap-center mb-20'>
        <Profile profileInfo={profileInfo} />
      </section>

      <section id='about' className='snap-center mt-20 mb-20'>
        <About profileInfo={profileInfo} darkMode={darkMode} />
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
