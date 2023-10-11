/* eslint-env node */
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/project-starship/',
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
});
