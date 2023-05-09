import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['store-beep.mp3'],
  },
  assetsInclude: ['**/*.html'],
  resolve:{
    alias:{
      '@api':  resolve(__dirname, 'src/api') ,
      '@components': resolve(__dirname, 'src/components') ,
      '@assets': resolve(__dirname, 'src/assets') ,
      '@store': resolve(__dirname, 'src/store') ,
      '@hooks': resolve(__dirname, 'src/hooks') ,
      '@routes': resolve(__dirname, 'src/routes') ,
      '@utils': resolve(__dirname, 'src/utils') ,
    }
  }
  
})
