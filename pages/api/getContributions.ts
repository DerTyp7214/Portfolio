import type { NextApiRequest, NextApiResponse } from 'next'
import { GitHubContributions } from '../../types/types'
import { fetchGithubContributions } from '../../utils/fetchGithubContributions'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GitHubContributions>
) {
  res.status(200).json(await fetchGithubContributions())
}
