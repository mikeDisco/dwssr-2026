//biblioteca de file stream 
import fs from   'node:fs';
//biblioteca de rutas 
import path from 'node:path';

import { fileURLToPath } from 'node:url'
const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

/**
 * Helper para Haddlebars que genera las etiquetas de vite 
 * EN DESARROLO:Conecta al servidor de desarrolo de vite 
 * EN PRODUCCION:usa los copilados de vite 
 */
export function viteAsset() {
// obterner mode de ejecucuion
const isDev = process.env.NODE_ENV !== 'production';
// rescatando de URL  del servidor de desarrollo
const viteDevServer = process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173';

// si estamos en modo de desarrolo 
if(isDev){
    //en desarollo, conectamos al servidor de vite
    //del front-end directamenete del servidor 
    // de Desarrollo de Vite
    return `<script type="module" src="${viteDevServer}/@vite/client"></script>
    <script type="module" src="${viteDevServer}/main.js"></script>`;
    
}
// En producccion leemos el manifest y generamos las etiquetas finales de produccion 
const manifestPath = 
    path.join(__dirname, '..', '..', 'dist', 'vite', 'manifest.json')
// si no existe el manifest, lanzamos un error
if(!fs.existsSync(manifestPath)){
  console.warn('Manifest de Vite no encontrado. Asegurese de ejecutar el build de Vite antes de iniciar el servidor en produccion');´
  return '';
}
}