import { PageInfo } from '../types/types'
import { cacheImageLocally, createFaviconWithBadge } from './downloadUtils'

const pages = ['default', 'rboard']

type Page = typeof pages[number]

const titles: { [key: Page]: string } = {
  default: 'Josua Lengwenath (DerTyp7214)',
  rboard: 'Rboard',
}

const favIcons: { [key: Page]: () => Promise<string> } = {
  default: async () =>
    await cacheImageLocally({
      file: `public/favicon.png`,
      imageName: 'favicon',
      path: 'favicons',
      newWidth: 120,
      newHeight: 120,
    }),
  rboard: async () =>
    await createFaviconWithBadge(
      {
        file: 'assets/parsed/rboardThemeManager.svg',
      },
      {},
      `rboard-favicon`
    ),
}

const ogImages: { [key: Page]: string } = {
  default: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/og-image.png?v=${process.env.NEXT_PUBLIC_RUN_ID}`,
  rboard: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/og-image-rboard.png?v=${process.env.NEXT_PUBLIC_RUN_ID}`,
}

const description: { [key: Page]: string | null } = {
  default: null,
  rboard: 'Gboard best modding tool',
}

export default async function fetchPageInfo(page?: string): Promise<PageInfo> {
  return {
    title: titles[page || 'default'],
    favIconUrl: await favIcons[page || 'default'](),
    ogImageUrl: ogImages[page || 'default'],
    description: description[page || 'default'],
    appName: 'DerTyp7214.de',
  }
}
