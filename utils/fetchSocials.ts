import { Social } from "../types/types"

export default async function fetchSocials(): Promise<Social[]> {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getSocials`)

    const json = await data.json()

    return json
}