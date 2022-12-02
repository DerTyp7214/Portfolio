import { PageInfo } from '../types/types'
import { cacheImageLocally } from './downloadUtils'

export default async function fetchPageInfo(): Promise<PageInfo> {
  return {
    title: 'Josua Lengwenath (DerTyp7214)',
    favIconUrl: await cacheImageLocally({
      file: `public/favicon.png`,
      imageName: 'favicon',
      path: 'favicons',
      newWidth: 120,
      newHeight: 120,
    }),
    description:
      'Josua Lengwenath (DerTyp7214) is a developer from Germany. He is a full stack developer and loves to create new things.',
    ogImageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
  }
}
