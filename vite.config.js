import { defineConfig } from 'vite'
import { swc } from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [swc()],
})
