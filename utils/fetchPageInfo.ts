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
    ogImageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png?v=${process.env.NEXT_PUBLIC_RUN_ID}`,
  }
}
