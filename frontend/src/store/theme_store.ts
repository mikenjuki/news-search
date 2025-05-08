import { create } from 'zustand'

export type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const storageKey = 'InfoSearch-ui-theme'

export const useThemeStore = create<ThemeState>((set) => ({
  theme: (localStorage.getItem(storageKey) as Theme) || 'system',
  setTheme: (theme) => {
    localStorage.setItem(storageKey, theme)
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }

    set({ theme })
  },
}))
