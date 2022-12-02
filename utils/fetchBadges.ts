import { CodersRankBadge } from '../types/types'
import { cacheImageLocally } from './downloadUtils'

export default async function fetchBadges(): Promise<CodersRankBadge[]> {
  const data = await fetch(
    'https://api.codersrank.io/v2/users/dertyp7214/badges?get_by=username'
  )
  const badges = (await data.json()) as { badges: CodersRankBadge[] }

  return await Promise.all(
    badges.badges.map(async (badge) => ({
      ...badge,
      imageUrl: await cacheImageLocally({
        url:
          badge.version === 'v1'
            ? `https://icon-widget.codersrank.io/api/${badge.language}`
            : `https://profile.codersrank.io/static/badgesV2/${badge.badgeFamily}/${badge.badgeType}.svg`,
        imageName:
          badge.version === 'v1'
            ? badge.language
            : `${badge.badgeFamily}-${badge.badgeType}`,
        path: 'badges',
        svg: true,
        newWidth: 60,
        newHeight: 60,
      }),
      smallImageUrl: await cacheImageLocally({
        url:
          badge.version === 'v1'
            ? `https://icon-widget.codersrank.io/api/${badge.language}`
            : `https://icon-widget.codersrank.io/api/${badge.values.language}`,
        imageName:
          badge.version === 'v1'
            ? `${badge.language}`
            : `${badge.values.language}`,
        path: 'badges',
        svg: true,
        newWidth: 20,
        newHeight: 20,
      }),
    }))
  )
}
