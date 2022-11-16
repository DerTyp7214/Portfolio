import { Skill } from "../types/types"
import fetchSkill from "./fetchSkill"

const languages = [
    'Kotlin', 'JavaScript', 'CSS', 'HTML', 'C++', 'JSON',
    'Java', 'C', 'Dart', 'Python', 'TypeScript'
]

const technologies = [
    'ReactJS', 'NodeJS', 'ExpressJS', 'Electron',
    'NextJS', 'Gson', 'Flutter', 'Git', 'GitHub',
]

export default async function fetchSkills(): Promise<Skill[]> {
    const languageRequests = languages.map(language =>
        fetchSkill({ skill: language, type: 'language' })
            .then(res => (res ? { ...res, name: language } : null))
    )

    const technologiesRequests = technologies.map(technology =>
        fetchSkill({ skill: technology, type: 'technology' })
            .then(async res => (res ? { ...res, name: technology } : null))
    )

    const languageData = await Promise.all(languageRequests) as Skill[]
    const technologiesData = await Promise.all(technologiesRequests) as Skill[]

    const skills: Skill[] = [...languageData, ...technologiesData].filter(a => a).map((skill) => {
        const skillName = skill.name

        return {
            name: skillName,
            score: Math.floor(skill.score * 100) / 100,
            topWorld: skill.topWorld,
            topWorldRank: skill.topWorldRank,
            imageUrl: `https://icon-widget.codersrank.io/api/${skillName}`
        }
    })

    return skills.sort((a, b) => b.score - a.score)
}