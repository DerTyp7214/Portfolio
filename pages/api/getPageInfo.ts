import type { NextApiRequest, NextApiResponse } from 'next'
import { PageInfo } from '../../types/types'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<PageInfo>
) {

    const pageInfo = {
        title: 'Josua Lengwenath (DerTyp7214)',
        favIconUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`
    }

    res.status(200).json(pageInfo)
}
