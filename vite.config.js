/* eslint-env node */
/* global process */



import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carga las variables de entorno (incluye .env, .env.[mode])
  const env = loadEnv(mode, process.cwd(), '')
  // Usa base personalizada si se define VITE_BASE; por defecto GitHub Pages en prod
  // Forzar base para GitHub Pages
  const base = '/solstice_SOLS/';
  return {
    base,
    plugins: [
      react(),
      // Solo activa el visualizer en build de producción
      mode === 'production' && visualizer({
        filename: 'dist/bundle-report.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    ].filter(Boolean),
  }
})
