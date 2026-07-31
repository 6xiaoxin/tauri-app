<script setup lang="ts">
import { FEATURE_ITEMS } from '@/config/app'

defineOptions({
  name: 'HomeView',
})
</script>

<template>
  <main class="mx-auto max-w-6xl">
    <section class="mb-10">
      <n-tag type="success" :bordered="false">Enterprise Scaffold</n-tag>
      <h1 class="mt-4 text-4xl font-bold tracking-tight">企业级 Tauri 客户端基座</h1>
      <n-text depth="3" class="mt-3 block text-base">
        模块化、严格类型、可持续扩展，并具备从保存到提交的完整质量门禁。
      </n-text>
    </section>

    <n-grid responsive="screen" cols="1 s:2 l:4" :x-gap="16" :y-gap="16">
      <n-grid-item v-for="feature in FEATURE_ITEMS" :key="feature.title">
        <n-card class="featureCard" hoverable>
          <template #header>
            <span class="text-lg font-semibold">{{ feature.title }}</span>
          </template>
          <p class="m-0 min-h-16 leading-6">{{ feature.description }}</p>
          <template #footer>
            <n-tag size="small">{{ feature.technology }}</n-tag>
          </template>
        </n-card>
      </n-grid-item>
    </n-grid>
  </main>
</template>

<style scoped lang="scss">
.featureCard {
  height: 100%;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;

  &:hover {
    transform: translateY(-3px);
  }
}
</style>
