import { ProfileInfo } from '../types/types'

export default async function fetchProfileInfo(): Promise<ProfileInfo> {
  return {
    name: 'Josua Lengwenath',
    avatarUrl: 'https://avatars.githubusercontent.com/u/37804065?v=4',
  }
}
