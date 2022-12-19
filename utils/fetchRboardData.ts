import { toHtml } from 'hast-util-to-html'
import { toHast } from 'mdast-util-to-hast'
import remarkBreaks from 'remark-breaks'
import remarkParse from 'remark-parse'
import { unified } from 'unified'
import { RboardData } from '../types/types'
import { rboardAppProjects } from './fetchProjects'

export default async function fetchRboardData(): Promise<RboardData> {
  return {
    title: 'Rboard',
    description: 'Gboard best modding tool',
    icon: 'RboardIcon',
    chips: [
      {
        icon: 'TelegramIcon',
        text: 'Telegram Channel',
        href: 'https://t.me/rkbdigboard',
      },
      {
        icon: 'XDAIcon',
        text: 'XDA Thread',
        href: 'https://forum.xda-developers.com/t/app-rboard-theme-manager.4331445/',
      },
      {
        icon: 'RepositoryIcon',
        text: 'Source Code',
        href: 'https://github.com/DerTyp7214/RboardThemeManagerV3',
      },
    ],
    projects: await Promise.all(
      Object.values(await rboardAppProjects()).map(async (project) => {
        const mdast = unified()
          .use(remarkParse)
          .use(remarkBreaks)
          .parse(project.longDescription)
        const hast = toHast(mdast)
        const html = hast ? toHtml(hast) : project.longDescription

        return {
          ...project,
          longDescription: html,
        }
      })
    ),
  }
}
