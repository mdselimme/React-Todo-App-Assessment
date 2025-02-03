import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://5nvfy5p7we.execute-api.ap-south-1.amazonaws.com/dev/', // Replace with your API URL
        changeOrigin: true,
        secure: true, // Set to true if using HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
