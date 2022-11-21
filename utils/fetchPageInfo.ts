import { PageInfo } from '../types/types'

export default async function fetchPageInfo(): Promise<PageInfo> {
  return {
    title: 'Josua Lengwenath (DerTyp7214)',
    favIconUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.png`,
    description:
      'Josua Lengwenath (DerTyp7214) is a developer from Germany. He is a full stack developer and loves to create new things.',
    ogImageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/og-image.png`,
  }
}
