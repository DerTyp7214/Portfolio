import { ProfileInfo } from '../types/types'
import { cacheImageLocally } from './downloadUtils'

export default async function fetchProfileInfo(): Promise<ProfileInfo> {
  return {
    name: 'Josua Lengwenath',
    avatarUrl: await cacheImageLocally({
      url: 'https://avatars.githubusercontent.com/u/37804065?v=4',
      imageName: 'avatar',
      path: 'profile',
      newWidth: 150,
      newHeight: 150,
    }),
  }
}
