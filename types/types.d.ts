export interface PageInfo {
    title: string;
    favIconUrl: string;
}

export interface ProfileInfo {
    name: string;
    avatarUrl: string;
}

export interface Social {
    name: string;
    url: string;
}

export interface Skill {
    name: string;
    score: number;
    topWorld: number | null;
    topWorldRank: number | null;
    imageUrl: string;
}

export interface Project {
    name: string;
    imageUrl: string;
    authors: string[];
    skills: Skill[];
    githubUrl?: string;
    playStoreUrl?: string;
    keypoints: string[];
}

export interface ContactInfo {
    email: string;
}

export interface CodersRankLanguage {
    name: string;
    country_all: number;
    country_rank: number;
    score: number;
    self_url: string;
    world_wide_all: number;
    world_wide_rank: number;
}

export interface CodersRankTechnology {
    name: string;
    score: number;
}

interface CodersRankBadgeV2 {
    badgeFamily: string;
    badgeType: string;
    description: string;
    values: {
        language: string;
    }[] | {
        days: string;
        endDate: string;
        startDate: string;
    }[];
    version: 'v2';
    visibility: string;
}

interface CodersRankBadgeV1 {
    language: string;
    location_name: string;
    location_type: string;
    rank: number;
    version: 'v1';
    visibility: string;
}

export type CodersRankBadge = CodersRankBadgeV1 | CodersRankBadgeV2;

export interface CodersRankProject {
    description: string;
    highlighted_technologies: string[];
    image: string;
    is_current: boolean;
    link_to_project: string;
    link_to_source_code: string;
    other_technologies: string[];
    project_title: string;
    start_date: string;
    end_date?: string;
}

export interface CodersRankActivities {
    [key: string]: {
        [key: string]: number;
    };
}

export interface CodersRankWorkExperience {
    company: string;
    highlighted_technologies: string[];
    is_current: boolean;
    is_remote: boolean;
    location: string;
    other_technologies: string[];
    start_date: string;
    title: string;
    end_date?: string;
}