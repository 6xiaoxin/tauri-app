import type { FeatureItem } from '@/types/app'

export const APP_NAME = import.meta.env.VITE_APP_TITLE ?? 'Tauri Enterprise'

export const FEATURE_ITEMS: readonly FeatureItem[] = [
  {
    title: '严格类型',
    description: 'TypeScript 全量严格选项与类型感知 ESLint，禁止显式 any。',
    technology: 'TypeScript 7',
  },
  {
    title: '桌面原生能力',
    description: '基于 Tauri 2 的安全轻量桌面容器，可按能力模型扩展。',
    technology: 'Tauri 2',
  },
  {
    title: '状态持久化',
    description: 'Pinia 模块化状态管理，按需持久化用户偏好。',
    technology: 'Pinia 4',
  },
  {
    title: '质量门禁',
    description: '格式、脚本、样式、类型与 Rust 检查统一串联。',
    technology: 'Husky + lint-staged',
  },
]
