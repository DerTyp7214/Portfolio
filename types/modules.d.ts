declare module 'node-vibrant/dist/vibrant' {
  import Vibrant from '@vibrant/core'
  export = Vibrant
}

declare module 'ntc' {
  export function name(hex: string): string[]
}
