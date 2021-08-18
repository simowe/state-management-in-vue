import { inject, provide } from 'vue'
import { nanoid } from 'nanoid'

// Generate a random unique key.
// And store it privately in this file.
const key = nanoid()

// Used in parent component
export function provideTheme(theme: string) {
  provide(key, theme)
}

// Used in child components
export function injectTheme(): string | undefined {
  return inject(key)
}
