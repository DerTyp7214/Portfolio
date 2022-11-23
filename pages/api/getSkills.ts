import type { NextApiRequest, NextApiResponse } from 'next'
import { Skill } from '../../types/types'

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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Skill[]>
) {
  const languageRequests = languages.map((language) =>
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getSkill/language/${language}`
    ).then(async (res) => res.json())
  )

  const technologiesRequests = technologies.map((technology) =>
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getSkill/technology/${technology}`
    ).then(async (res) => res.json())
  )

  const languageData = (await Promise.all(languageRequests)) as Skill[]
  const technologiesData = (await Promise.all(technologiesRequests)) as Skill[]

  const skills: Skill[] = [...languageData, ...technologiesData].filter(
    (a) => a
  )

  res.status(200).json(skills.sort((a, b) => b.score - a.score))
}
