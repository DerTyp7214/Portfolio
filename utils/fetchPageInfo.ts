import { PageInfo } from '../types/types'
import { cacheImageLocally, createFaviconWithBadge } from './downloadUtils'

const pages = ['default', 'rboard', 'creator']

type Page = typeof pages[number]

const titles: { [key: Page]: string } = {
  default: 'Josua Lengwenath (DerTyp7214)',
  rboard: 'Rboard',
  creator: 'Creator',
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
  creator: async () =>
    await createFaviconWithBadge(
      {
        file: 'assets/parsed/creator.svg',
      },
      {},
      `creator-favicon`
    ),
}

const manifestUrls: { [key: string]: string } = {
  default: `/manifest.json?v=${process.env.NEXT_PUBLIC_RUN_ID}`,
  rboard: `/rboard-manifest.json?v=${process.env.NEXT_PUBLIC_RUN_ID}`,
  creator: `/creator-manifest.json?v=${process.env.NEXT_PUBLIC_RUN_ID}`,
}

const ogImages: { [key: Page]: () => Promise<string> } = {
  default: async () =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/assets/og-image.png?v=${process.env.NEXT_PUBLIC_RUN_ID}`,
  rboard: async () =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/assets/og-image-rboard.png?v=${process.env.NEXT_PUBLIC_RUN_ID}`,
  creator: async () =>
    `${process.env.NEXT_PUBLIC_BASE_URL}${await cacheImageLocally({
      file: 'assets/parsed/og-image-creator.png',
      imageName: 'og-image-creator',
      path: 'og-images',
      png: true,
    })}`,
}

const description: { [key: Page]: string | null } = {
  default: null,
  rboard: 'Gboard best modding tool',
  creator: 'Create your own keyboard theme',
}

export default async function fetchPageInfo(page?: string): Promise<PageInfo> {
  return {
    title: titles[page || 'default'],
    favIconUrl: await favIcons[page || 'default'](),
    ogImageUrl: await ogImages[page || 'default'](),
    description: description[page || 'default'],
    appName: 'DerTyp7214.de',
    manifestUrl: manifestUrls[page || 'default'],
  }
}
