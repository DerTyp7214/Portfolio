import type { NextApiRequest, NextApiResponse } from 'next'
import { ProfileInfo } from '../../types/types'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProfileInfo>
) {

    const profile = {
        name: 'Josua Lengwenath',
        avatarUrl: 'https://avatars.githubusercontent.com/u/37804065?v=4'
    }

    res.status(200).json(profile)
}
