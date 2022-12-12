import { Skill } from '../types/types'
import fetchSkill from './fetchSkill'

export const languages = [
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

export const technologies = [
  'ReactJS',
  'NodeJS',
  'ExpressJS',
  'Electron',
  'NextJS',
  'Gson',
  'Flutter',
  'GitHub',
]

export const wikiMappping: { [key: string]: string | undefined } = {
  'C++': 'C++ (programming language)',
  'C#': 'C Sharp (programming language)',
  C: 'C (programming language)',
  Dart: 'Dart (programming language)',
  HTML: 'HTML',
  JSON: 'JSON',
  JavaScript: 'JavaScript',
  Java: 'Java (programming language)',
  Kotlin: 'Kotlin (programming language)',
  NodeJS: 'Node.js',
  Python: 'Python (programming language)',
  ReactJS: 'React (JavaScript library)',
  TypeScript: 'TypeScript',
  CSS: 'CSS',
  ExpressJS: 'Express.js',
  Electron: 'Electron (software framework)',
  NextJS: 'Next.js',
  Gson: 'Gson',
  Flutter: 'Flutter (software)',
  GitHub: 'GitHub',
}

export default async function fetchSkills(): Promise<Skill[]> {
  const languageRequests = languages.map((language) =>
    fetchSkill({
      skill: language,
      type: 'language',
      wiki: wikiMappping[language],
    }).then((res) => (res ? { ...res, name: language } : null))
  )

  const technologiesRequests = technologies.map((technology) =>
    fetchSkill({
      skill: technology,
      type: 'technology',
      wiki: wikiMappping[technology],
    }).then((res) => (res ? { ...res, name: technology } : null))
  )

  const languageData = (await Promise.all(languageRequests)) as Skill[]
  const technologiesData = (await Promise.all(technologiesRequests)) as Skill[]

  const skills: Skill[] = [...languageData, ...technologiesData].filter(
    (a) => a
  )

  return skills.sort((a, b) => b.score - a.score)
}
