import { ContactInfo } from "../types/types"

export default async function fetchContactInfo(): Promise<ContactInfo> {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getContactInfo`)

    const json = await data.json()

    return json
}