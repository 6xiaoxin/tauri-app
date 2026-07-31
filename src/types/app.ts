export type ThemeMode = 'system' | 'light' | 'dark'

export interface AppState {
  themeMode: ThemeMode
}

export interface FeatureItem {
  title: string
  description: string
  technology: string
}
