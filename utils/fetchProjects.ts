import { Project } from '../types/types'
import {
  cacheImageLocally,
  createFaviconWithBadge,
  gitHubDownloads,
  playStoreDownloads,
  roundDownloads
} from './downloadUtils'

const rboardApps = ['manager', 'creator', 'patcher']

type RboardApp = typeof rboardApps[number]

export async function rboardAppProjects(): Promise<{
  [key: RboardApp]: Project
}> {
  const getSkills = (skills: string[]): string[] => skills

  return {
    manager: {
      name: 'Rboard Theme Manager V3',
      id: 'Rboard Theme Manager V3'.replace(/ /g, '-').toLowerCase(),
      authors: ['DerTyp7214', 'AkosPaha', 'RadekBledowski'],
      imageUrl: 'assets/parsed/rboardThemeManager.svg',
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
        )) +
        12000 + // 12k downloads from Play Store before it was removed
        15000, // 15k downloads from GitHub before it realized that they get reset every time a new release is made :)
      downloadUrl:
        'https://github.com/DerTyp7214/RboardThemeManagerV3/releases/latest/download/app-release.apk',
      alternativeDownload: {
        name: 'Download (Below Android 12)',
        url: 'https://github.com/DerTyp7214/RboardThemeManagerV3/releases/download/latest-rCompatible/app-release.apk',
      },
      extraLinks: [
        {
          name: 'Rboard',
          url: '/rboard#manager',
          iconUrl: await cacheImageLocally({
            file: 'public/projects/rboard.svg',
            imageName: 'rboard',
            path: 'icons',
            newWidth: 32,
            newHeight: 32,
          }),
          className: 'invert dark:invert-0',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/gboardthemes',
          iconUrl: await cacheImageLocally({
            url: 'https://telegram.org/img/t_logo.png',
            imageName: 'telegram',
            path: 'icons',
            newWidth: 32,
            newHeight: 32,
          }),
        },
      ],

      title: 'Rboard Theme Manager',
      description: 'Download themes and enable hidden Gboard features',
      longDescription: `
# [How to use Rboard Theme Manager](#manager)

## Downloading themes

1. Open the app
2. Open the "Download" tab
3. Select a themepack
4. Select the themes you want to download
5. Click on the "Download" button

## Enabling hidden features

1. Open the app
2. Swipe up to open the navigation drawer
3. Select "Flags"
4. Select the features you want to enable
5. Go back to the main screen to apply the changes
    `,
      shortId: 'manager',
      icon: 'RboardIcon',
    },
    creator: {
      name: 'Rboard Theme Creator',
      id: 'Rboard Theme Creator'.replace(/ /g, '-').toLowerCase(),
      authors: ['DerTyp7214', 'RadekBledowski'],
      imageUrl: 'assets/parsed/rboardThemeCreator.svg',
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
      downloadUrl:
        'https://github.com/DerTyp7214/RboardThemeCreator/releases/latest/download/app-release.apk',
      extraLinks: [
        {
          name: 'Rboard',
          url: '/rboard#creator',
          iconUrl: await cacheImageLocally({
            file: 'public/projects/rboard.svg',
            imageName: 'rboard',
            path: 'icons',
            newWidth: 32,
            newHeight: 32,
          }),
          className: 'invert dark:invert-0',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/gboardthemes',
          iconUrl: await cacheImageLocally({
            url: 'https://telegram.org/img/t_logo.png',
            imageName: 'telegram',
            path: 'icons',
            newWidth: 32,
            newHeight: 32,
          }),
        },
      ],

      title: 'Rboard Theme Creator',
      description:
        'Create your own theme base that can be editied with Patcher',
      longDescription: `
# [How to use Rboard Theme Creator](#creator)

## Creating theme

1. Open the app
2. Select options above preview of keyboard
3. Click "Add theme"
4. Select Rboard Theme manager if you done editing theme or Rboard theme Patcher if you want to continue editing theme with more options
        `,
      shortId: 'creator',
      icon: 'RboardThemeCreatorIcon',
    },
    patcher: {
      name: 'Rboard Patcher',
      id: 'Rboard Patcher'.replace(/ /g, '-').toLowerCase(),
      authors: ['DerTyp7214', 'RadekBledowski'],
      imageUrl: 'assets/parsed/rboardPatcher.svg',
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
      downloadUrl:
        'https://github.com/DerTyp7214/RboardPatcher/releases/latest/download/app-release.apk',
      extraLinks: [
        {
          name: 'Rboard',
          url: '/rboard#patcher',
          iconUrl: await cacheImageLocally({
            file: 'public/projects/rboard.svg',
            imageName: 'rboard',
            path: 'icons',
            newWidth: 32,
            newHeight: 32,
          }),
          className: 'invert dark:invert-0',
        },
        {
          name: 'Telegram',
          url: 'https://t.me/gboardthemes',
          iconUrl: await cacheImageLocally({
            url: 'https://telegram.org/img/t_logo.png',
            imageName: 'telegram',
            path: 'icons',
            newWidth: 32,
            newHeight: 32,
          }),
        },
      ],

      title: 'Rboard Theme Patcher',
      description: 'Customize your Rboard themes to your preferences',
      longDescription: `
# [How to use Rboard Theme Patcher](#patcher)

## Patching theme

1. Open Rboard Theme Manager
2. Select theme you want to patch
3. Click "Patch"
4. Select icons/fonts/fixes/tweaks you want inside your theme
5. Click "Add to Manager" to finish patching your theme (name is optional, leave it if you want to just replace previous theme)
      `,
      shortId: 'patcher',
      icon: 'RboardThemePatcherIcon',
    },
  }
}

export default async function fetchProjects(): Promise<Project[]> {
  const getSkills = (skills: string[]): string[] => skills

  return await Promise.all(
    [
      ...Object.values(await rboardAppProjects()),
      {
        name: 'Rboard IME Tester',
        authors: ['DerTyp7214', 'RadekBledowski'],
        imageUrl: 'assets/parsed/rboardImeTester.svg',
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
        downloadUrl:
          'https://github.com/DerTyp7214/RboardIMETester/releases/latest/download/app-release.apk',
      },
      {
        name: 'Mixplorer Theme Creator',
        authors: ['DerTyp7214', 'RadekBledowski'],
        imageUrl: 'assets/parsed/mixThemeCreator.svg',
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
        downloadUrl:
          'https://github.com/DerTyp7214/MixplorerThemeCreator/releases/latest/download/app-release.apk',
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
        imageUrl: 'assets/parsed/ytmdRemote.svg',
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
        downloadUrl:
          'https://github.com/DerTyp7214/YouTubeMusicRemote/releases/latest/download/app-release.apk',
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
        downloadUrl:
          'https://github.com/DerTyp7214/youtube-music/releases/latest',
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
          url: project.imageUrl.startsWith('http')
            ? project.imageUrl
            : undefined,
          file: project.imageUrl.startsWith('http')
            ? undefined
            : project.imageUrl,
          imageName: project.name,
          path: 'projects',
          newWidth: 250,
          newHeight: 250,
        }),
        cacheImageLocally({
          file: 'public/playStore.svg',
          imageName: 'playStore',
          path: 'favicons',
          newWidth: 120,
          newHeight: 120,
        }),
        cacheImageLocally({
          url: 'https://github.githubassets.com/favicons/favicon-dark.svg',
          imageName: 'gitHub',
          path: 'favicons',
          newWidth: 120,
          newHeight: 120,
        }),
      ])

      const id = project.name.replace(/ /g, '-').toLowerCase()

      return {
        ...project,
        imageUrl: images[0],
        playStoreIcon: images[1],
        githubIcon: images[2],
        id: id,
        downloads: roundDownloads(project.downloads),
        faviconUrl: await createFaviconWithBadge(
          {
            url: project.imageUrl.startsWith('http')
              ? project.imageUrl
              : undefined,
            file: project.imageUrl.startsWith('http')
              ? undefined
              : project.imageUrl,
          },
          {
            file: 'public/favicon.png',
          },
          `${id}-favicon`
        ),
        extraLinks: [
          ...((project as any).extraLinks ?? []),
          {
            name: 'GitHub',
            url: project.githubUrl,
            iconUrl: images[2],
            className: 'invert dark:invert-0',
          },
        ],
      }
    })
  )
}
