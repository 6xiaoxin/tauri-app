type NaiveUiComponents = {
  [
    TKey in keyof typeof import('naive-ui') as TKey extends `N${string}` ? TKey : never
  ]: (typeof import('naive-ui'))[TKey]
}

declare module 'vue' {
  interface GlobalComponents extends NaiveUiComponents {
    NButton: NaiveUiComponents['NButton']
  }
}

declare global {
  const useDialog: typeof import('naive-ui').useDialog
  const useLoadingBar: typeof import('naive-ui').useLoadingBar
  const useMessage: typeof import('naive-ui').useMessage
  const useNotification: typeof import('naive-ui').useNotification
}

export {}
