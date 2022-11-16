import type { NextApiRequest, NextApiResponse } from 'next'
import { CodersRankLanguage, CodersRankTechnology, Skill } from '../../../../types/types'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Skill>
) {

    const { skill, type } = req.query

    if (typeof skill !== 'string') return

    if (type === 'language') {
        const languageData = await fetch(`http://api.codersrank.io/v2/users/dertyp7214/languages/${skill}?get_by=username`)
            .then(async res => ({ ...(await res.json()), name: skill })) as CodersRankLanguage

        res.status(200).json({
            name: skill,
            score: Math.floor(languageData.score * 100) / 100,
            topWorld: languageData.world_wide_all,
            topWorldRank: languageData.world_wide_rank,
            imageUrl: `https://icon-widget.codersrank.io/api/${skill}`
        })
    } else if (type === 'technology') {
        const technologyData = await fetch(`http://api.codersrank.io/v2/users/dertyp7214/technologies/${skill}?get_by=username`)
            .then(async res => ({ ...(await res.json()), name: skill })) as CodersRankTechnology

        res.status(200).json({
            name: skill,
            score: Math.floor(technologyData.score * 100) / 100,
            imageUrl: `https://icon-widget.codersrank.io/api/${skill}`
        })
    }

}
