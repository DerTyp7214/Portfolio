export interface PageInfo {
  title: string
  favIconUrl: string
  description: string | null
  ogImageUrl: string
  appName: string
  manifestUrl: string
}

export interface RboardData {
  chips: {
    icon: string
    text: string
    href: string
  }[]
  projects: Project[]
  title: string
  description: string
  icon: string
}

export interface ProfileInfo {
  name: string
  avatarUrl: string
}

export interface Social {
  name: string
  url: string
}

export interface Skill {
  name: string
  score: number
  topWorld: number | null
  topWorldRank: number | null
  topCountry?: number | null
  topCountryRank?: number | null
  imageUrl: string
  language: boolean
  description?: string | null
}

export interface Project {
  id: string
  name: string
  imageUrl: string
  authors: string[]
  skills: string[]
  githubUrl?: string
  playStoreUrl?: string
  keypoints: string[]
  downloads?: string | number | null
  playStoreIcon?: string
  githubIcon?: string
  downloadUrl?: string
  faviconUrl?: string
  alternativeDownload?: {
    name: string
    url: string
  }
  extraButtons?: {
    text: string
    url: string
  }[]
  extraLinks?: {
    iconUrl: string
    name: string
    url: string
    className?: string
  }[]

  shortId?: string
  title?: string
  description?: string
  longDescription?: string
  icon?: string
}

export interface ContactInfo {
  email: string
}

export interface CodersRankLanguage {
  name: string
  country_all: number
  country_rank: number
  score: number
  self_url: string
  world_wide_all: number
  world_wide_rank: number
}

export interface CodersRankTechnology {
  name: string
  score: number
}

export interface CodersRankBadgeV2 {
  badgeFamily: string
  badgeType: string
  description: string
  values: {
    language: string
  } & {
    days: string
    endDate: string
    startDate: string
  }
  version: 'v2'
  visibility: string
  imageUrl?: string
  smallImageUrl?: string
}

export interface CodersRankBadgeV1 {
  language: string
  location_name: string
  location_type: string
  rank: number
  version: 'v1'
  visibility: string
  imageUrl?: string
  smallImageUrl?: string
}

export type CodersRankBadge = CodersRankBadgeV1 | CodersRankBadgeV2

export interface CodersRankProject {
  description: string
  highlighted_technologies: string[]
  image: string
  is_current: boolean
  link_to_project: string
  link_to_source_code: string
  other_technologies: string[]
  project_title: string
  start_date: string
  end_date?: string
}

export interface CodersRankActivities {
  [key: string]: {
    [key: string]: number
  }
}

export interface CodersRankWorkExperience {
  company: string
  highlighted_technologies: string[]
  is_current: boolean
  is_remote: boolean
  location: string
  other_technologies: string[]
  start_date: string
  title: string
  end_date?: string
}

export interface ContributionDay {
  contributionCount: number
  contributionLevel: ContributionLevelName
  date: string
  color: string
}

export interface GitHubContributions {
  contributions?: ContributionDay[][]
  totalContributions?: number
}

export const CONTRIBUTION_LEVELS = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
}

export type ContributionLevelName = keyof typeof CONTRIBUTION_LEVELS

export type KeyboardPreset = string

export type KeyboardTheme = {
  mainBackground: string
  keyBackground: string
  keyColor: string
  secondaryKeyBackground: string
  accentBackground: string
  themeName: string
  author: string
  keyBorderRadius: number
  fontSize: string
  preset: KeyboardPreset
}

export type KeyboardColors = {
  mainBackground?: string
  keyBackground?: string
  keyColor?: string
  secondaryKeyBackground?: string
  accentBackground?: string
  themeName?: string
  author?: string
  preset?: KeyboardPreset
}

export type ThemePreset = {
  name: string
  html?: string
  styleSheetMd: string
  styleSheetMdBorder: string
  imageBase64: string[]
}
