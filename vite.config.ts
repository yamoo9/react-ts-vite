import path from 'node:path'
import { fileURLToPath } from 'url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      jsxRuntime: 'automatic',
    }),
  ],
  css: {
    devSourcemap: true,
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 5000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          ecosystem: ['axios'],
        },
      },
    },
  },
})
