import { CodersRankLanguage, CodersRankTechnology, Skill } from '../types/types'

export default async function fetchSkill({
  skill,
  type,
}: {
  skill: string
  type: 'technology' | 'language'
}): Promise<Skill | null> {
  if (type === 'language') {
    const languageData = (await fetch(
      `http://api.codersrank.io/v2/users/dertyp7214/languages/${encodeURIComponent(skill)}?get_by=username`
    ).then(async (res) => ({
      ...(await res.json()),
      name: skill,
    }))) as CodersRankLanguage

    return {
      name: skill,
      score: Math.floor(languageData.score * 100) / 100,
      topWorld: languageData.world_wide_all ?? null,
      topWorldRank: languageData.world_wide_rank ?? null,
      topCountry: languageData.country_all ?? null,
      topCountryRank: languageData.country_rank ?? null,
      imageUrl: `https://icon-widget.codersrank.io/api/${encodeURIComponent(skill)}`,
      language: true,
    }
  } else {
    const technologyData = (await fetch(
      `http://api.codersrank.io/v2/users/dertyp7214/technologies/${encodeURIComponent(skill)}?get_by=username`
    ).then(async (res) => ({
      ...(await res.json()),
      name: skill,
    }))) as CodersRankTechnology

    return {
      name: skill,
      score: Math.floor(technologyData.score * 100) / 100,
      topWorld: null,
      topWorldRank: null,
      imageUrl: `https://icon-widget.codersrank.io/api/${encodeURIComponent(skill)}`,
      language: false,
    }
  }
}
