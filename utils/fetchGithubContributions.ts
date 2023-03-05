import fetch from 'node-fetch'
import { ContributionDay } from '../types/types'

export default async function fetchGithubContributions() {
  const query = `
    query($userName:String!) {
      user(login: $userName){
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                color
                contributionCount
                contributionLevel
                date
              }
            }
          }
        }
      }
    }
    `
  const variables = `
    {
      "userName": "DerTyp7214"
    }
    `

  const response = await fetch('https://api.github.com/graphql', {
    body: JSON.stringify({ query, variables }),
    headers: { Authorization: `bearer ${process.env.GITHUB_TOKEN}` },
    method: 'POST',
  })

  const { data } = await response.json() as any

  const contributionCalendar =
    data?.user?.contributionsCollection?.contributionCalendar

  if (
    !contributionCalendar ||
    !Object.hasOwn(contributionCalendar, 'weeks') ||
    !Object.hasOwn(contributionCalendar, 'totalContributions')
  ) {
    return {}
  }

  const {
    weeks,
    totalContributions,
  }: {
    weeks: { contributionDays: ContributionDay[] }[]
    totalContributions: number
  } = contributionCalendar

  const contributions = weeks.map((week) => week.contributionDays)

  return { contributions, totalContributions }
}
