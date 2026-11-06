// Biblioteca de file stream
import fs from 'node:fs';
// Biblioteca de rutas
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import createDebug from 'debug';

const debug = createDebug('dwssr-2026:vite');

// Creando la variable de rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Helper para Handlebars que genera las etiquetas de Vite
 * EN DESARROLLO: Conecta al servidor de desarrollo de Vite
 * EN PRODUCCION: Usa los compilados de Vite
 */
export function viteAssets() {
  // Obtener modo de ejecucion
  const isDev = process.env.NODE_ENV !== 'production';
  // Rescatando la URL del servidor de desarrollo
  const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173';

  // Si estamos en modo de desarrollo
  if (isDev) {
    // En desarrollo, cargamos los archivos
    // del frontend directamente desde el servidor
    // de desarrollo de Vite
    return `
        <script type="module" src="${viteDevServer}/@vite/client"></script>
        <script type="module" src="${viteDevServer}/main.js"></script>
        `;
  }
  // En produccion leemos el manifest
  // y generamos las etiquetas finales de produccion
  const manifestPath = path.join(__dirname, '..', '..', 'dist', 'vite', 'manifest.json');

  // Si no existe el manifest
  if (!fs.existsSync(manifestPath)) {
    debug("Vite manifest not found. Run 'npm run build' to generate it.");
    return '';
  }
  // Leyendo y parseando a JSON el archivo
  // de manifiesto que genera Vite en la compilacion
  // de los archivos del front-end
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  const mainEntry = manifest['main.js'];
  // Guardar Main.js
  if (!mainEntry) {
    debug('Archivo main.js no esta disponible en el manifiesto de Vite');
    return '';
  }

  let tags = '';

  // CSS files
  if (mainEntry.css) {
    mainEntry.css.forEach((cssFile) => {
      tags += `<link rel="stylesheet" href="${cssFile}">\n`;
    });
  }

  // JS files
  tags += `<script type="module" src="/${mainEntry.file}" defer></script>`;

  return tags;
}

/**
 * Funcion registradora del Helper de Handlebars
 */
export function registerViteHelper(hbs) {
  hbs.registerHelper(
    'viteAssets',
    () =>
      // Sanitizando la salida del helper
      new hbs.SafeString(viteAssets()),
  );
}