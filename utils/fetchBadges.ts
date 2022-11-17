import { CodersRankBadge } from "../types/types"

export default async function fetchBadges(): Promise<CodersRankBadge[]> {

    const data = await fetch('https://api.codersrank.io/v2/users/dertyp7214/badges?get_by=username')
    const badges = await data.json() as { badges: CodersRankBadge[] }

    return badges.badges
}