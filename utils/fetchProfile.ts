import { ProfileInfo } from "../types/types"

export default async function fetchProfileInfo(): Promise<ProfileInfo> {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getProfile`)

    const json = await data.json()

    return json
}