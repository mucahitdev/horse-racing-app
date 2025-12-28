/// <reference types="vite/client" />

declare module 'vuex' {
  import { Store } from 'vuex/types'
  export * from 'vuex/types'
  export function useStore<S = Record<string, unknown>>(): Store<S>
}

