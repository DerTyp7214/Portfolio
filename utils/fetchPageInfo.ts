import { PageInfo } from "../types/types"

export default async function fetchPageInfo(): Promise<PageInfo> {
    return {
        title: 'Josua Lengwenath (DerTyp7214)',
        favIconUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`
    }
}