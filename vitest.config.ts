import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    exclude: ['**/.direnv/**', '**/node_modules/**'],
    server: {
      deps: {
        inline: ['vitest-package-exports'],
      },
    },
  },
})
