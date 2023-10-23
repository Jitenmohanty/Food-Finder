import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '*': {
        target: 'https://api.edamam.com/api/recipes/v2?type=public&q=pizza&app_id=9e271ac3&app_key=6a6342218a242985b9f50e0f9ad22dad',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/recipes/v2'),
      },
    }
  },
  plugins: [react()],
})
