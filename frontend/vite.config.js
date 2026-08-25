import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vite's production build uses oxc by default and ignores this — it's
  // here only for Vitest's test runner, which still transforms via esbuild
  // and needs this explicit setting to resolve JSX under React 19's
  // automatic runtime. Don't remove it to silence the build-time warning.
  esbuild: {
    jsx: 'automatic',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
})
