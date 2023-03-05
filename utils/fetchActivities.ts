import fetch from 'node-fetch'
import { CodersRankActivities } from '../types/types'

export default async function fetchActivites(): Promise<CodersRankActivities> {
  const data = await fetch(
    'https://api.codersrank.io/v2/users/dertyp7214/activities?get_by=username'
  )
  const activities = (await data.json()) as CodersRankActivities

  return activities
}
