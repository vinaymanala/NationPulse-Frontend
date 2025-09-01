import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/'),
      '@app': resolve(__dirname, 'src/app/'),
      '@features': resolve(__dirname, 'src/features/'),
      '@shared': resolve(__dirname, 'src/shared/'),
      '@tests': resolve(__dirname, 'src/tests/'),
    },
  },
});
