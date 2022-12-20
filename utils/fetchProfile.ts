import { ProfileInfo } from '../types/types'
import { cacheImageLocally } from './downloadUtils'

export default async function fetchProfileInfo(): Promise<ProfileInfo> {
  return {
    name: 'Josua Lengwenath',
    avatarUrl: await cacheImageLocally({
      file: 'assets/parsed/profile.png',
      imageName: 'avatar',
      path: 'profile',
      newWidth: 150,
      newHeight: 150,
    }),
  }
}
