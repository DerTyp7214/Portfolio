import { motion } from 'framer-motion'
import { URLSearchParams } from 'next/dist/compiled/@edge-runtime/primitives/url'
import { useEffect, useState } from 'react'
import { CodersRankBadge, GitHubContributions, Skill } from '../types/types'
import BadgeCollection from './BadgeCollection'
import ContributionChart from './ContributionChart'
import SkillItem from './SkillItem'
import SkillModal from './SkillModal'

type Props = {
  skills: Skill[]
  gitHubContributions: GitHubContributions
  badges: CodersRankBadge[]
}

export default function Skills({ skills, gitHubContributions, badges }: Props) {
  const [showModal, ShowModal] = useState(false)

  const [currentSkill, setCurrentSkill] = useState<Skill | null>(null)

  const openModal = (skill: Skill) => {
    setCurrentSkill(skill)
    ShowModal(true)
  }

  useEffect(() => {
    if (window.location.hash === '#skills') {
      const searchParams = new URLSearchParams(window.location.search)

      const skill = skills.find(
        (skill) => skill.name.toLowerCase() === searchParams.get('skill')?.toLowerCase()
      )
      if (skill) {
        openModal(skill)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      className='flex relative text-center flex-row max-w-[2000px] px-10 min-h-screen justify-center space-y-0 mx-auto items-start'>
      <h3 className='absolute top-24 uppercase tracking-[20px] text-white/30 text-2xl'>
        Skills
      </h3>

      <h3 className='absolute top-36 uppercase tracking-[3px] text-white/30 text-sm'>
        Hover over a skill for some informations
      </h3>

      <SkillModal
        show={showModal}
        skill={currentSkill}
        onClose={() => ShowModal(false)}
      />

      <div className='flex flex-col 2xl:flex-row space-y-10 2xl:space-y-0 2xl:space-x-10 pt-48 relative transition-transform duration-200'>
        <div className='flex flex-row space-y-10 justify-center items-start transition-transform duration-200'>
          <div className='opacity-100 w-auto md:opacity-0 md:w-0 grid grid-cols-3 gap-5'>
            {skills
              ?.slice(0, Math.min(skills.length, 3 * 5))
              ?.map((skill, index) => (
                <SkillItem
                  onClick={openModal}
                  key={index}
                  skill={skill}
                  directionLeft={index % 3 < 1}
                />
              ))}
          </div>
          <div className='opacity-0 w-0 md:opacity-100 md:w-auto lg:opacity-0 lg:w-0 grid grid-cols-4 gap-5'>
            {skills
              ?.slice(0, Math.min(skills.length, 4 * 5))
              ?.map((skill, index) => (
                <SkillItem
                  onClick={openModal}
                  key={index}
                  skill={skill}
                  directionLeft={index % 4 < 2}
                />
              ))}
          </div>
          <div className='w-0 opacity-0 lg:opacity-100 lg:w-auto xl:opacity-0 xl:w-0 grid grid-cols-5 gap-5'>
            {skills
              ?.slice(0, Math.min(skills.length, 5 * 5))
              ?.map((skill, index) => (
                <SkillItem
                  onClick={openModal}
                  key={index}
                  skill={skill}
                  directionLeft={
                    index % 5 < (index > skills.length / 2 ? 3 : 2)
                  }
                />
              ))}
          </div>
          <div className='w-0 opacity-0 xl:opacity-100 xl:w-auto grid grid-cols-5 gap-5'>
            {skills
              ?.slice(0, Math.min(skills.length, 5 * 5))
              ?.map((skill, index) => (
                <SkillItem
                  key={index}
                  onClick={openModal}
                  skill={skill}
                  directionLeft
                />
              ))}
          </div>
        </div>
        <div className='opacity-0 h-0 w-0 lg:w-auto lg:h-auto lg:opacity-100 pt-2 2xl:pt-12 flex flex-col items-center space-y-10'>
          <BadgeCollection badges={badges} />
          <ContributionChart chartData={gitHubContributions} />
        </div>
      </div>
    </motion.div>
  )
}
