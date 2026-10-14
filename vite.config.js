import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import tailwindcss from '@tailwindcss/vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  root: 'src',
  // Agregando a Vite el plugin de Tailwind
  plugins: [
    tailwindcss(),
  ],
  // Configuración del servidor de desarrollo
  server: {
    port: 5173,
    strictPort: true,
  },
  // Configuración de empaquetado (Build)
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: {
        // Al tener root: 'src', la entrada se resuelve directo desde ahí o con resolve
        main: resolve(__dirname, 'src/main.js'),
      },
    },
  },
  publicDir: false,
});