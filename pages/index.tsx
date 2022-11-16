/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next/types'
import { ContactInfo, PageInfo, ProfileInfo, Project, Skill, Social } from '../types/types'
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

type Props = {
  pageInfo: PageInfo,
  socials: Social[],
  profileInfo: ProfileInfo,
  projects: Project[],
  skills: Skill[],
  contactInfo: ContactInfo
}

export default function Home({ pageInfo, socials, profileInfo, projects, skills, contactInfo }: Props) {
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
        <Skills skills={skills} />
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

  return {
    props: {
      pageInfo,
      socials,
      profileInfo,
      projects,
      skills,
      contactInfo
    }
  }
}