import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    sourcemap: false,
    rollupOptions: {
      output: {
        // Group vendor code by package so each chunk caches independently. The 3D stack (three,
        // React Three Fiber, Theatre.js) is only reached through the lazy Field import.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          const pkg = id.split('node_modules/')[1].split('/').slice(0, id.split('node_modules/')[1].startsWith('@') ? 2 : 1).join('/');
          return `vendor-${pkg.replace('@', '').replace('/', '-')}`;
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
