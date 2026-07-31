import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'

const tauriDevHost = process.env['TAURI_DEV_HOST']

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      dts: false,
      imports: [
        {
          'naive-ui': ['useDialog', 'useLoadingBar', 'useMessage', 'useNotification'],
        },
      ],
    }),
    Components({
      dts: false,
      resolvers: [NaiveUiResolver()],
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    host: tauriDevHost ?? false,
    hmr:
      tauriDevHost === undefined
        ? undefined
        : {
            protocol: 'ws',
            host: tauriDevHost,
            port: 1421,
          },
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
})
