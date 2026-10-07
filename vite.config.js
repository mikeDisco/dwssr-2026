import {defineConfig} from 'vite';

import { resolve } from 'node: path';
//Imports para crear dirname
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';    
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default defineConfig({

    root:' src',
    // configurando un servidor de desarrollo
    server: {
        //puerto de escucha 
        port: 5173,
        //gigidez del puerto
        strict: true,
    },
    // configurando el Build
   build: {
        // Directorio de salida del js para producción
        outDir: "../dist",
        // Asegurando limpieza del folder de producción
        emptyOutDir: true,
        // Generar manifiesto para el servidor
        manifest: true,
        // Opciones de empaquetado
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/main.js'),
            }
        }
    },
    // Configuración para el desarrollo
    publicDir: false
})