<script setup lang="ts">
import { invoke, isTauri } from '@tauri-apps/api/core'
import { listen, type UnlistenFn } from '@tauri-apps/api/event'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { confirm } from '@tauri-apps/plugin-dialog'
import { darkTheme, zhCN } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, watch } from 'vue'
import { RouterView } from 'vue-router'

import { useAppStore } from '@/stores/app'
import { checkAndInstallUpdate } from '@/services/updater'

defineOptions({
  name: 'App',
})

const appStore = useAppStore()
const { isDark, themeMode } = storeToRefs(appStore)
let unlistenExitRequest: UnlistenFn | undefined

async function confirmExit(): Promise<void> {
  const confirmed = await confirm('确定要退出程序吗？', {
    title: '退出程序',
    kind: 'warning',
  })

  if (confirmed) {
    await invoke('exit_app')
  }
}

onMounted(() => {
  if (isTauri()) {
    void checkAndInstallUpdate({ notifyIfCurrent: false }).catch(() => undefined)

    void listen('request-exit', () => {
      void confirmExit()
    }).then((unlisten) => {
      unlistenExitRequest = unlisten
    })
  }
})

onUnmounted(() => {
  unlistenExitRequest?.()
})

watch(
  [isDark, themeMode],
  ([dark, mode]) => {
    document.documentElement.dataset['theme'] = dark ? 'dark' : 'light'
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'

    if (isTauri()) {
      void getCurrentWindow().setTheme(mode === 'system' ? null : mode)
    }
  },
  { immediate: true },
)
</script>

<template>
  <n-config-provider :locale="zhCN" :theme="isDark ? darkTheme : null">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <RouterView />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
    <n-global-style />
  </n-config-provider>
</template>
