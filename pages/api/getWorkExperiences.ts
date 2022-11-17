import type { NextApiRequest, NextApiResponse } from 'next'
import { CodersRankWorkExperience } from '../../types/types'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CodersRankWorkExperience[]>
) {
    const data = await fetch('https://api.codersrank.io/v2/users/dertyp7214/work_experiences?get_by=username')
    const workExperiences = await data.json() as { work_experiences: CodersRankWorkExperience[] }

    res.status(200).json(workExperiences.work_experiences)
}