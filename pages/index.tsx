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
import { fetchGithubContributions } from '../utils/fetchGithubContributions'

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

      <Link href='#profile'>
        <footer className='sticky bottom-5 w-full z-50'>
          <div className='flex items-center justify-center'>
            <ArrowUpIcon className='h-10 w-10 rounded-full filter text-white/30 hover:text-white hover:h-11 hover:w-11 transition-all duration-300 cursor-pointer' />
          </div>
        </footer>
      </Link>
      <div id='modal-root'></div>
      <ReactTooltip
        html
        backgroundColor='#56606b'
        multiline
        className='max-w-[200px] text-center'
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
