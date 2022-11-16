import type { NextApiRequest, NextApiResponse } from 'next'
import { Social } from '../../types/types'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Social[]>
) {

    const socials = [
        {
            name: 'GitHub',
            url: 'https://github.com/DerTyp7214'
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/dertyp7214/'
        },
        {
            name: 'Twitter',
            url: 'https://twitter.com/DerTyp7214'
        }
    ]

    res.status(200).json(socials)
}
