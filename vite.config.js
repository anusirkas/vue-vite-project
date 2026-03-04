import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,       // võimaldab kasutada expect(), describe() ilma importita
    environment: 'jsdom', // <--- see on oluline!
    //setupFiles: './vitest.setup.js', // valikuline, kui tahad setup
  },
})
