/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'http'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy Claude API calls to bypass CORS in development
      '/api/claude': {
        target: 'https://api.anthropic.com',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api\/claude/, '/v1/messages'),
        configure: (proxy: any) => {
          proxy.on('proxyReq', (proxyReq: any, req: IncomingMessage) => {
            // Forward the original headers including API key
            if (req.headers['x-api-key']) {
              proxyReq.setHeader('x-api-key', req.headers['x-api-key']);
            }
            if (req.headers['anthropic-version']) {
              proxyReq.setHeader('anthropic-version', req.headers['anthropic-version']);
            }
            if (typeof console !== 'undefined') {
              console.log('🚀 Proxying Claude API request:', proxyReq.method, proxyReq.path);
            }
          });
          proxy.on('proxyRes', (proxyRes: ServerResponse) => {
            if (typeof console !== 'undefined') {
              console.log('✅ Claude API response:', (proxyRes as any).statusCode);
            }
          });
          proxy.on('error', (err: Error) => {
            if (typeof console !== 'undefined') {
              console.error('❌ Proxy error:', err.message);
            }
          });
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['crypto-js', 'lucide-react'],
        },
      },
    },
  },
})
