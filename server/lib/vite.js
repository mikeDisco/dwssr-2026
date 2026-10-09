import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

// Variables de ruta para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Helper para Handlebars que genera las etiquetas de Vite
 * 
 * EN DESARROLLO:
 * Apunta al servidor dev de Vite en http://localhost:5173/main.js
 * 
 * EN PRODUCCIÓN:
 * Lee el manifest.json para inyectar los CSS y JS compilados
 */
export function viteAssets() {
    // Verificar si estamos en modo de desarrollo
    const isDev = process.env.NODE_ENV !== 'production';

    // URL del servidor de desarrollo de Vite
    const viteDevServer = process.env.VITE_DEV_SERVER || 'http://localhost:5173';

    // 1. MODO DESARROLLO
    if (isDev) {
        // Al usar root: 'src' en vite.config.js, la ruta es /main.js (sin el prefijo /src)
        return `
            <script type="module" src="${viteDevServer}/@vite/client"></script>
            <script type="module" src="${viteDevServer}/main.js"></script>
        `;
    }

    // 2. MODO PRODUCCIÓN
    const manifestPath = path.join(
        __dirname,
        '..',
        '..',
        'dist',
        '.vite',
        'manifest.json'
    );

    if (!fs.existsSync(manifestPath)) {
        console.warn(
            "Vite manifest not found. Run 'npm run build' to generate it."
        );
        return '';
    }

    const manifest = JSON.parse(
        fs.readFileSync(manifestPath, 'utf-8')
    );

    // Buscar la entrada principal en el manifest
    const mainEntry = manifest['src/main.js'] || manifest['main.js'];

    if (!mainEntry) {
        console.warn(
            'El archivo principal no está disponible en el manifiesto de Vite'
        );
        return '';
    }

    let tags = '';

    // Inyectar archivos CSS procesados
    if (mainEntry.css) {
        mainEntry.css.forEach((cssFile) => {
            tags += `<link rel="stylesheet" href="/${cssFile}">\n`;
        });
    }

    // Inyectar script de JavaScript
    tags += `<script type="module" src="/${mainEntry.file}"></script>\n`;

    return tags;
}

/**
 * Registrar los helpers en Handlebars
 */
export function registerHelpers(hbs) {
    hbs.registerHelper('viteAssets', () => {
        return new hbs.SafeString(viteAssets());
    });
}