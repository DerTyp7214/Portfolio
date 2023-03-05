import fetch from 'node-fetch'
import { ThemePreset, ThemePresetManifest } from '../types/types'

const repoUrl =
  'https://raw.githubusercontent.com/GboardThemes/ThemeCreatorRepo/main/'
const manifestUrl = `${repoUrl}manifest.json`

export default async function fetchThemePresets(): Promise<ThemePreset[]> {
  const manifest: ThemePresetManifest = await fetch(manifestUrl).then((res) =>
    res.json() as Promise<ThemePresetManifest>
  )

  return Object.values(manifest)
}
