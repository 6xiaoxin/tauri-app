<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { RouterLink, RouterView } from 'vue-router'

import { APP_NAME } from '@/config/app'
import { useAppStore } from '@/stores/app'

defineOptions({
  name: 'DefaultLayout',
})

const appStore = useAppStore()
const { themeMode } = storeToRefs(appStore)
</script>

<template>
  <n-layout class="appLayout">
    <n-layout-header bordered class="appHeader">
      <n-text strong class="brand">{{ APP_NAME }}</n-text>
      <n-space align="center">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/about">关于</RouterLink>
        <n-radio-group v-model:value="themeMode" size="small">
          <n-radio-button value="system">跟随系统</n-radio-button>
          <n-radio-button value="light">浅色</n-radio-button>
          <n-radio-button value="dark">深色</n-radio-button>
        </n-radio-group>
      </n-space>
    </n-layout-header>
    <n-layout-content content-style="padding: 32px;">
      <RouterView />
    </n-layout-content>
  </n-layout>
</template>

<style scoped lang="scss">
.appLayout {
  min-height: 100vh;
}

.appHeader {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 32px;
  backdrop-filter: blur(12px);

  a {
    color: inherit;
    text-decoration: none;
    transition: color 160ms ease;

    &:hover,
    &.router-link-active {
      color: #18a058;
    }
  }
}

.brand {
  font-size: 18px;
}
</style>
