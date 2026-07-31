import { computed, onScopeDispose, ref } from 'vue'
import { defineStore } from 'pinia'

import { STORAGE_KEYS } from '@/constants/storage'
import type { ThemeMode } from '@/types/app'

export const useAppStore = defineStore(
  'app',
  () => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
    const systemIsDark = ref<boolean>(systemTheme.matches)
    const themeMode = ref<ThemeMode>('system')
    const isDark = computed<boolean>(
      () => themeMode.value === 'dark' || (themeMode.value === 'system' && systemIsDark.value),
    )

    function handleSystemThemeChange(event: MediaQueryListEvent): void {
      systemIsDark.value = event.matches
    }

    systemTheme.addEventListener('change', handleSystemThemeChange)
    onScopeDispose(() => {
      systemTheme.removeEventListener('change', handleSystemThemeChange)
    })

    return {
      isDark,
      themeMode,
    }
  },
  {
    persist: {
      key: STORAGE_KEYS.app,
      pick: ['themeMode'],
    },
  },
)
