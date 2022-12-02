import { Skill } from '../types/types'
import fetchSkill from './fetchSkill'

const languages = [
  'Kotlin',
  'JavaScript',
  'CSS',
  'HTML',
  'C++',
  'JSON',
  'Java',
  'C',
  'Dart',
  'Python',
  'TypeScript',
  'C#',
]

const technologies = [
  'ReactJS',
  'NodeJS',
  'ExpressJS',
  'Electron',
  'NextJS',
  'Gson',
  'Flutter',
  'GitHub',
]

export default async function fetchSkills(): Promise<Skill[]> {
  const languageRequests = languages.map((language) =>
    fetchSkill({ skill: language, type: 'language' }).then((res) =>
      res ? { ...res, name: language } : null
    )
  )

  const technologiesRequests = technologies.map((technology) =>
    fetchSkill({ skill: technology, type: 'technology' }).then((res) =>
      res ? { ...res, name: technology } : null
    )
  )

  const languageData = (await Promise.all(languageRequests)) as Skill[]
  const technologiesData = (await Promise.all(technologiesRequests)) as Skill[]

  const skills: Skill[] = [...languageData, ...technologiesData].filter(
    (a) => a
  )

  return skills.sort((a, b) => b.score - a.score)
}
