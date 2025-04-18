import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, ('src/index.ts')),
      name: 'react-hooks-lib-facuekl',
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: 'react',
          'react-dom': 'reactDOM'
        }
      }
    }
  },
  plugins: [react()],
})
