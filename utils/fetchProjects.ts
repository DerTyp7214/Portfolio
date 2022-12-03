import { Project, Skill } from '../types/types'
import fetchSkill from './fetchSkill'
import {
  cacheImageLocally,
  gitHubDownloads,
  playStoreDownloads,
} from './downloadUtils'

const languageSkills = [
  'Kotlin',
  'JavaScript',
  'C',
  'JSON',
  'HTML',
  'CSS',
  'Java',
  'C++',
  'TypeScript',
]

const technologySkills = ['ReactJS', 'NodeJS', 'ExpressJS', 'Electron', 'Gson']

export default async function fetchProjects(): Promise<Project[]> {
  const skillData = await Promise.all([
    ...languageSkills.map((skill) => fetchSkill({ skill, type: 'language' })),
    ...technologySkills.map((skill) =>
      fetchSkill({ skill, type: 'technology' })
    ),
  ])

  const getSkills = (skills: string[]): Skill[] =>
    skillData.filter((a) => a && skills.includes(a.name)) as Skill[]

  return await Promise.all(
    [
      {
        name: 'Rboard Theme Manager V3',
        authors: ['DerTyp7214', 'AkosPaha', 'RadekBledowski'],
        imageUrl:
          'https://raw.githubusercontent.com/DerTyp7214/RboardThemeManagerV3/staging/app/src/main/ic_launcher-playstore.png',
        skills: getSkills(['Kotlin', 'Gson', 'C', 'C++']),
        githubUrl: 'https://github.com/DerTyp7214/RboardThemeManagerV3',
        keypoints: [
          'Rboard Theme Manager V3 is a theme manager for the Rboard keyboard.',
          'It also allows you to download themes from the community.',
          'It is available on F-Droid and GitHub.',
        ],
        downloads:
          (await gitHubDownloads(
            'DerTyp7214',
            'RboardThemeManagerV3',
            'tags/latest-release',
            true
          )) + 12000, // 12k downloads from Play Store before it was removed
      },
      {
        name: 'Rboard Theme Creator',
        authors: ['DerTyp7214', 'RadekBledowski'],
        imageUrl:
          'https://raw.githubusercontent.com/DerTyp7214/RboardThemeCreator/staging/app/src/main/ic_launcher-playstore.png',
        skills: getSkills(['Kotlin', 'Gson', 'C', 'C++']),
        githubUrl: 'https://github.com/DerTyp7214/RboardThemeCreator',
        playStoreUrl:
          'https://play.google.com/store/apps/details?id=de.dertyp7214.rboardthemecreator',
        keypoints: [
          'Rboard Theme Creator is a theme creator for the Rboard keyboard.',
          'It allows you to create your own themes for Rboard.',
          'It also allows you to share your themes with others.',
          'It is available on Google Play and GitHub.',
        ],
        downloads:
          (await playStoreDownloads('de.dertyp7214.rboardthemecreator')) +
          (await gitHubDownloads(
            'DerTyp7214',
            'RboardThemeCreator',
            'tags/latest-release',
            true
          )),
      },
      {
        name: 'Rboard Patcher',
        authors: ['DerTyp7214', 'RadekBledowski'],
        imageUrl:
          'https://raw.githubusercontent.com/DerTyp7214/RboardPatcher/staging/app/src/main/ic_launcher-playstore.png',
        skills: getSkills(['Kotlin', 'Gson', 'C', 'C++']),
        githubUrl: 'https://github.com/DerTyp7214/RboardPatcher',
        playStoreUrl:
          'https://play.google.com/store/apps/details?id=de.dertyp7214.rboardpatcher',
        keypoints: [
          'Rboard Patcher is a patcher for Rboard Themes.',
          'It allows you to patch Rboard Themes with custom features.',
          'It is available on Google Play and GitHub.',
          'It is also available as a module for Rboard Theme Manager V3.',
          'It is also available as a module for Rboard Theme Creator.',
        ],
        downloads:
          (await playStoreDownloads('de.dertyp7214.rboardpatcher')) +
          (await gitHubDownloads(
            'DerTyp7214',
            'RboardPatcher',
            'tags/latest-release',
            true
          )),
      },
      {
        name: 'Rboard IME Tester',
        authors: ['DerTyp7214', 'RadekBledowski'],
        imageUrl:
          'https://raw.githubusercontent.com/DerTyp7214/RboardIMETester/staging/app/src/main/ic_launcher-playstore.png',
        skills: getSkills(['Kotlin', 'Gson', 'C', 'C++']),
        githubUrl: 'https://github.com/DerTyp7214/RboardIMETester',
        playStoreUrl:
          'https://play.google.com/store/apps/details?id=de.dertyp7214.rboardimetester',
        keypoints: [
          'Rboard IME Tester is a keyboard tester for Rboard.',
          'It allows you to test your keyboard layouts.',
          'It is available on Google Play.',
        ],
        downloads:
          (await playStoreDownloads('de.dertyp7214.rboardimetester')) +
          (await gitHubDownloads(
            'DerTyp7214',
            'RboardIMETester',
            'tags/latest-release',
            true
          )),
      },
      {
        name: 'Mixplorer Theme Creator',
        authors: ['DerTyp7214', 'RadekBledowski'],
        imageUrl:
          'https://raw.githubusercontent.com/DerTyp7214/MixplorerThemeCreator/master/app/src/main/ic_launcher-playstore.png',
        skills: getSkills(['Kotlin', 'Gson', 'C', 'C++']),
        githubUrl: 'https://github.com/DerTyp7214/MixplorerThemeCreator',
        playStoreUrl:
          'https://play.google.com/store/apps/details?id=de.dertyp7214.mixplorerthemecreator',
        keypoints: [
          'Mixplorer Theme Creator is a theme creator for Mixplorer.',
          'It allows you to create your own themes for Mixplorer.',
          'It also allows you to share your themes with others.',
          'It is available on Google Play.',
        ],
        downloads:
          (await playStoreDownloads('de.dertyp7214.mixplorerthemecreator')) +
          (await gitHubDownloads(
            'DerTyp7214',
            'MixplorerThemeCreator',
            'tags/latest-release',
            true
          )),
      },
      {
        name: 'Overlayer',
        authors: ['DerTyp7214', 'RadekBledowski'],
        imageUrl:
          'https://play-lh.googleusercontent.com/uWDZ4vxJ1XEmyiZIri4Jg8o-SwJOMSQWO53sNdt3LmNPXOsKcM36MU9sCU-CnzzPHZcN=w240-h480-rw',
        skills: getSkills(['Kotlin']),
        githubUrl: 'https://github.com/DerTyp7214/Overlayer',
        playStoreUrl:
          'https://play.google.com/store/apps/details?id=de.dertyp7214.overlayer',
        keypoints: [
          'Currently in rewrite.',
          'Overlayer is a overlay app for Android.',
          'It allows you to manage overlays in Android.',
          'It is available on Google Play.',
        ],
        downloads: await playStoreDownloads('de.dertyp7214.overlayer'),
      },
      {
        name: 'YouTube Music Remote',
        authors: ['DerTyp7214'],
        imageUrl:
          'https://raw.githubusercontent.com/DerTyp7214/YouTubeMusicRemote/master/app/src/main/ic_launcher-playstore.png',
        skills: getSkills(['Kotlin', 'Gson']),
        githubUrl: 'https://github.com/DerTyp7214/YouTubeMusicRemote',
        playStoreUrl:
          'https://play.google.com/store/apps/details?id=de.dertyp7214.youtubemusicremote',
        keypoints: [
          'YouTube Music Remote is a remote control for YouTube Music.',
          'It allows you to control YouTube Music from your phone.',
          'It is available on Google Play.',
        ],
        downloads:
          (await playStoreDownloads('de.dertyp7214.youtubemusicremote')) +
          (await gitHubDownloads(
            'DerTyp7214',
            'YouTubeMusicRemote',
            'tags/latest-release',
            true
          )),
      },
      {
        name: 'YouTube Music Desktop',
        authors: ['DerTyp7214'],
        imageUrl:
          'https://raw.githubusercontent.com/DerTyp7214/youtube-music/master/assets/youtube-music.png',
        skills: getSkills(['JavaScript', 'HTML', 'CSS', 'JSON']),
        githubUrl: 'https://github.com/DerTyp7214/youtube-music',
        keypoints: [
          'YouTube Music Desktop is a desktop app for YouTube Music.',
          'It allows you to control YouTube Music from your desktop.',
          'It is available on GitHub.',
        ],
        downloads: await gitHubDownloads(
          'DerTyp7214',
          'youtube-music',
          '',
          true
        ),
      },
      {
        name: 'Color Utils C',
        authors: ['DerTyp7214'],
        imageUrl: 'https://icon-widget.codersrank.io/api/C',
        skills: getSkills(['Kotlin', 'C', 'C++']),
        githubUrl: 'https://github.com/DerTyp7214/ColorUtilsC',
        keypoints: [
          'Color Utils C is a native library for Android.',
          'It allows you to convert colors between different color spaces.',
          'It is available on GitHub.',
        ],
      },
    ].map(async (project) => {
      const images = await Promise.all([
        cacheImageLocally({
          url: project.imageUrl,
          imageName: project.name,
          path: 'projects',
          newWidth: 250,
          newHeight: 250,
        }),
        cacheImageLocally({
          file: 'public/playStore.svg',
          imageName: 'playStore',
          path: 'favicons',
          newWidth: 30,
          newHeight: 30,
        }),
        cacheImageLocally({
          url: 'https://github.githubassets.com/favicons/favicon.svg',
          imageName: 'gitHub',
          path: 'favicons',
          newWidth: 30,
          newHeight: 30,
        }),
      ])

      return {
        ...project,
        imageUrl: images[0],
        playStoreIcon: images[1],
        githubIcon: images[2],
      }
    })
  )
}
