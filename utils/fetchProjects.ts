import { Project } from "../types/types"

export default async function fetchProjects(): Promise<Project[]> {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getProjects`)

    const json = await data.json()

    return json
}