import type { NextApiRequest, NextApiResponse } from 'next'
import { CodersRankActivities } from '../../types/types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CodersRankActivities>
) {
  const data = await fetch(
    'https://api.codersrank.io/v2/users/dertyp7214/activities?get_by=username'
  )
  const activities = (await data.json()) as CodersRankActivities

  res.status(200).json(activities)
}
