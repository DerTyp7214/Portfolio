import { PageInfo } from "../types/types"

export default async function fetchPageInfo(): Promise<PageInfo> {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getPageInfo`)

    const json = await data.json()

    return json
}