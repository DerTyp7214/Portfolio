import { Skill } from "../types/types"

export default async function fetchSkills(): Promise<Skill[]> {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSkills`)

    const json = await data.json()

    return json
}