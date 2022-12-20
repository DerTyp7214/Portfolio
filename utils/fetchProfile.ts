import { ProfileInfo } from '../types/types'
import { cacheImageLocally } from './downloadUtils'

export default async function fetchProfileInfo(): Promise<ProfileInfo> {
  return {
    name: 'Josua Lengwenath',
    avatarUrl: await cacheImageLocally({
      file: 'assets/parsed/favicon.svg',
      imageName: 'avatar',
      path: 'profile',
      newWidth: 150,
      newHeight: 150,
    }),
  }
}
