import { ThemePreset } from '../types/types'
import { defaultPreset } from './themeUtils'

export default async function fetchThemePresets(): Promise<ThemePreset[]> {
  return [defaultPreset]
}
