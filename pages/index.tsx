/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next/types'
import { CodersRankActivities, CodersRankBadge, ContactInfo, PageInfo, ProfileInfo, Project, Skill, Social } from '../types/types'
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
import fetchActivities from '../utils/fetchActivities'
import ActivityChart from '../components/ActivityChart'
import fetchBadges from '../utils/fetchBadges'
import ReactTooltip from 'react-tooltip'

type Props = {
  pageInfo: PageInfo,
  socials: Social[],
  profileInfo: ProfileInfo,
  projects: Project[],
  skills: Skill[],
  contactInfo: ContactInfo,
  activities: CodersRankActivities,
  badges: CodersRankBadge[]
}

export default function Home({ pageInfo, socials, profileInfo, projects, skills, contactInfo, activities, badges }: Props) {
  return (
    <div className='h-screen bg-background text-white snap-y snap-mandatory overflow-y-scroll scroll-smooth overflow-x-hidden z-0 customScroll'>
      <Head>
        <title>{pageInfo.title}</title>
        <link rel='icon' href={pageInfo.favIconUrl} />
      </Head>

      <Header socials={socials} />

      <section id='profile' className='snap-center'>
        <Profile profileInfo={profileInfo} />
      </section>

      <section id='about' className='snap-center'>
        <About profileInfo={profileInfo} />
      </section>

      <section id='projects' className='snap-center'>
        <Projects projects={projects} />
      </section>

      <section id='skills' className='snap-start'>
        <Skills skills={skills} chartData={activities} badges={badges} />
      </section>

      <section id='contact' className='snap-start'>
        <ContactMe contactInfo={contactInfo} />
      </section>

      <Link href='#profile'>
        <footer className='sticky bottom-5 w-full z-50'>
          <div className='flex items-center justify-center'>
            <ArrowUpIcon className='h-10 w-10 rounded-full filter text-white/30 hover:text-white hover:h-11 hover:w-11 transition-all duration-300 cursor-pointer' />
          </div>
        </footer>
      </Link>
      <ReactTooltip html backgroundColor='#56606b' />
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
  const activities: CodersRankActivities = await fetchActivities()
  const badges: CodersRankBadge[] = await fetchBadges()

  return {
    props: {
      pageInfo,
      socials,
      profileInfo,
      projects,
      skills,
      contactInfo,
      activities,
      badges
    }
  }
}