import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    // Настройки CSS-модулей, которые ты используешь в проекте
    modules: {
      // Переводит имена классов в camelCase (styles.regInputWrapper вместо styles['regInput-wrapper'])
      localsConvention: 'camelCaseOnly',
    },
    devSourcemap: true, // Показывает в инспекторе браузера, из какого конкретно .module.css файла пришел стиль
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild', // Максимально быстрое сжатие JS и CSS
    sourcemap: false,  // Отключаем карты кода для продакшена, чтобы сборка весила меньше
    rollupOptions: {
      output: {
        // Раскладывает итоговые файлы продакшена по аккуратным папкам (js, css)
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  },
  server: {
    port: 3000, // Удобный фиксированный рабочий порт (localhost:3000)
    open: true, // Автоматически открывает сайт в браузере при команде npm run dev
  }
})