import { isTauri } from '@tauri-apps/api/core'
import { confirm, message } from '@tauri-apps/plugin-dialog'
import { relaunch } from '@tauri-apps/plugin-process'
import { check } from '@tauri-apps/plugin-updater'

import { APP_NAME } from '@/config/app'

export interface UpdateProgress {
  downloaded: number
  percentage: number
  total: number
}

export interface UpdateOptions {
  notifyIfCurrent?: boolean
  onProgress?: (progress: UpdateProgress) => void
}

export type UpdateResult = 'cancelled' | 'current' | 'installed' | 'unsupported'

function formatReleaseMessage(version: string, body?: string): string {
  const notes = body?.trim()
  return notes
    ? `发现新版本 ${version}。\n\n更新内容：\n${notes}\n\n是否立即下载并安装？`
    : `发现新版本 ${version}，是否立即下载并安装？`
}

export async function checkAndInstallUpdate(options: UpdateOptions = {}): Promise<UpdateResult> {
  if (!isTauri()) {
    return 'unsupported'
  }

  const update = await check({ timeout: 30_000 })
  if (update === null) {
    if (options.notifyIfCurrent === true) {
      await message('当前已是最新版本。', {
        title: '检查更新',
        kind: 'info',
      })
    }
    return 'current'
  }

  const shouldInstall = await confirm(formatReleaseMessage(update.version, update.body), {
    title: `${APP_NAME} 更新`,
    kind: 'info',
  })
  if (!shouldInstall) {
    return 'cancelled'
  }

  let downloaded = 0
  let total = 0

  await update.downloadAndInstall((event) => {
    switch (event.event) {
      case 'Started':
        total = event.data.contentLength ?? 0
        break
      case 'Progress':
        downloaded += event.data.chunkLength
        break
      case 'Finished':
        downloaded = total
        break
    }

    const percentage = total > 0 ? Math.min(100, Math.round((downloaded / total) * 100)) : 0
    options.onProgress?.({ downloaded, percentage, total })
  })

  const shouldRestart = await confirm('更新已安装，需要重启程序才能生效。是否立即重启？', {
    title: '更新完成',
    kind: 'info',
  })
  if (shouldRestart) {
    await relaunch()
  }

  return 'installed'
}
