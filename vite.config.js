import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://3.109.211.104:8001/', // Replace with your API URL
        changeOrigin: true,
        secure: true, // Set to true if using HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
