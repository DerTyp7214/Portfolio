import { Social } from '../types/types'

export default async function fetchSocials(): Promise<Social[]> {
  return [
    {
      name: 'GitHub',
      url: 'https://github.com/DerTyp7214',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/dertyp7214/',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/DerTyp7214',
    },
  ]
}
