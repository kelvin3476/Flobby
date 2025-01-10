import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:5173', /* TODO: 개발 서버 url로 변경 후 접속 연결 확인 필요 */
        changeOrigin: true
      }
    }
  }
})
