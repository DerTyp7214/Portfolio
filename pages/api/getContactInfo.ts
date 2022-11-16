import type { NextApiRequest, NextApiResponse } from 'next'
import { ContactInfo } from '../../types/types'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ContactInfo>
) {

    const contactInfo = {
        email: 'lengwenath1+contact@gmail.com'
    }

    res.status(200).json(contactInfo)
}
