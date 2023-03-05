import fetch from 'node-fetch'
import wikijs from 'wikijs'
import { CodersRankLanguage, CodersRankTechnology, Skill } from '../types/types'
import { cacheImageLocally } from './downloadUtils'

async function fetchSkillWiki(
  query: string,
  language: boolean
): Promise<string | null | undefined> {
  const wiki = wikijs()
  const page = await wiki.page(query).catch(() => null)
  const summary = await page?.summary()?.catch(() => null)

  return summary ? summary : null
}

export default async function fetchSkill({
  skill,
  type,
  wiki,
}: {
  skill: string
  type: 'technology' | 'language'
  wiki?: string
}): Promise<Skill | null> {
  if (type === 'language') {
    const languageData = (await fetch(
      `http://api.codersrank.io/v2/users/dertyp7214/languages/${encodeURIComponent(
        skill
      )}?get_by=username`
    ).then(async (res) => ({
      ...(await res.json() as CodersRankLanguage),
      name: skill,
    }))) as CodersRankLanguage

    return {
      name: skill,
      score: Math.floor(languageData.score * 100) / 100,
      topWorld: languageData.world_wide_all ?? null,
      topWorldRank: languageData.world_wide_rank ?? null,
      topCountry: languageData.country_all ?? null,
      topCountryRank: languageData.country_rank ?? null,
      imageUrl: await cacheImageLocally({
        url: `https://icon-widget.codersrank.io/api/${encodeURIComponent(
          skill
        )}`,
        imageName: `${type}-${skill}`,
        path: 'skills',
        svg: true,
        newWidth: 90,
        newHeight: 90,
      }),
      language: true,
      description: wiki ? await fetchSkillWiki(wiki, true) : null,
    }
  } else {
    const technologyData = (await fetch(
      `http://api.codersrank.io/v2/users/dertyp7214/technologies/${encodeURIComponent(
        skill
      )}?get_by=username`
    ).then(async (res) => ({
      ...(await res.json() as CodersRankTechnology),
      name: skill,
    }))) as CodersRankTechnology

    return {
      name: skill,
      score: Math.floor(technologyData.score * 100) / 100,
      topWorld: null,
      topWorldRank: null,
      imageUrl: await cacheImageLocally({
        url: `https://icon-widget.codersrank.io/api/${encodeURIComponent(
          skill
        )}`,
        imageName: `${type}-${skill}`,
        svg: true,
        path: 'skills',
        newWidth: 90,
        newHeight: 90,
      }),
      language: false,
      description: wiki ? await fetchSkillWiki(wiki, false) : null,
    }
  }
}
