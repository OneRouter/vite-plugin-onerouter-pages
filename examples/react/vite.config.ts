import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { reactRouterPlugin } from '@onerouter/vite-plugin-screens';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactRouterPlugin({
      async: true,
    }),
  ],
});
