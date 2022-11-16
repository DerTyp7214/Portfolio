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