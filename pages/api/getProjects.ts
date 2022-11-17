import type { NextApiRequest, NextApiResponse } from 'next'
import { CodersRankProject, Project } from '../../types/types'
import fetchProjects from '../../utils/fetchProjects'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CodersRankProject[] | Project[]>
) {
    const { external } = req.query

    if (external === 'true') {
        const data = await fetch('https://api.codersrank.io/v2/users/dertyp7214/projects?get_by=username')
        const projects = await data.json() as { projects: CodersRankProject[] }

        res.status(200).json(projects.projects)
    } else {
        res.status(200).json(await fetchProjects())
    }
}