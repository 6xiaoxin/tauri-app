<script setup lang="ts">
import { getVersion } from '@tauri-apps/api/app'
import { isTauri } from '@tauri-apps/api/core'
import { message } from '@tauri-apps/plugin-dialog'
import { onMounted, ref } from 'vue'

import { APP_NAME } from '@/config/app'
import { checkAndInstallUpdate, type UpdateProgress } from '@/services/updater'

defineOptions({
  name: 'AboutView',
})

const qualityCommand = 'pnpm fix && pnpm quality'
const currentVersion = ref<string>('Web 开发模式')
const isChecking = ref<boolean>(false)
const progress = ref<UpdateProgress | null>(null)

function formatBytes(bytes: number): string {
  if (bytes <= 0) {
    return '正在准备下载…'
  }
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

async function checkForUpdates(): Promise<void> {
  isChecking.value = true
  progress.value = null

  try {
    await checkAndInstallUpdate({
      notifyIfCurrent: true,
      onProgress: (value) => {
        progress.value = value
      },
    })
  } catch (error: unknown) {
    const detail = error instanceof Error ? error.message : String(error)
    await message(`检查更新失败：${detail}`, {
      title: '软件更新',
      kind: 'error',
    })
  } finally {
    isChecking.value = false
  }
}

onMounted(async () => {
  if (isTauri()) {
    currentVersion.value = await getVersion()
  }
})
</script>

<template>
  <main class="mx-auto grid max-w-3xl gap-6">
    <n-card title="软件更新">
      <n-space vertical size="large">
        <n-descriptions :column="1" label-placement="left">
          <n-descriptions-item label="应用">{{ APP_NAME }}</n-descriptions-item>
          <n-descriptions-item label="当前版本">v{{ currentVersion }}</n-descriptions-item>
          <n-descriptions-item label="更新通道">GitHub Releases</n-descriptions-item>
        </n-descriptions>

        <template v-if="progress">
          <n-progress
            type="line"
            :percentage="progress.percentage"
            :processing="progress.percentage < 100"
          />
          <n-text depth="3">
            已下载 {{ formatBytes(progress.downloaded) }}
            <template v-if="progress.total > 0">/ {{ formatBytes(progress.total) }}</template>
          </n-text>
        </template>

        <n-button
          type="primary"
          :disabled="!isTauri()"
          :loading="isChecking"
          @click="checkForUpdates"
        >
          {{ isChecking ? '正在检查…' : '检查更新' }}
        </n-button>
      </n-space>
    </n-card>

    <n-card>
      <n-h1>工程约束</n-h1>
      <n-p>
        所有代码在合入前必须通过格式化、ESLint、Stylelint、TypeScript、Rust 格式和编译检查。
      </n-p>
      <n-code :code="qualityCommand" language="shell" word-wrap />
      <n-space class="mt-6">
        <n-tag type="success">0 errors</n-tag>
        <n-tag type="info">0 warnings</n-tag>
        <n-tag type="warning">0 any</n-tag>
      </n-space>
    </n-card>
  </main>
</template>
