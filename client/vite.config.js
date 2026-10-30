import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    // Forward /api calls to the Express server. The browser only ever talks to
    // one origin, so no CORS setup is needed and no API URL lives in frontend code.
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})
