import type { NextApiRequest, NextApiResponse } from 'next'
import { CodersRankBadge } from '../../types/types'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<CodersRankBadge[]>
) {
    const data = await fetch('https://api.codersrank.io/v2/users/dertyp7214/badges?get_by=username')
    const badges = await data.json() as { badges: CodersRankBadge[] }

    res.status(200).json(badges.badges)
}