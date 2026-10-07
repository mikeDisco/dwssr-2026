// Biblioteca de File System
import fs from 'node:fs'

// Biblioteca de rutas
import path from 'node:path'

// Importaciones para trabajar con rutas en ES Modules
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

// Creando las variables de rutas
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Helper para Handlebars que genera las etiquetas de Vite
 *
 * EN DESARROLLO:
 * Conecta al servidor de desarrollo de Vite
 *
 * EN PRODUCCIÓN:
 * Usa los archivos compilados de Vite
 */
export function viteAssets() {
    // Obtener modo de ejecución
    const isDev = process.env.NODE_ENV !== 'production'

    // Obtener la URL del servidor de desarrollo
    const viteDevServer =
        process.env.VITE_DEV_SERVER || 'http://localhost:5173'

    // Si estamos en modo de desarrollo
    if (isDev) {
        return `
            <script type="module" src="${viteDevServer}/@vite/client"></script>
            <script type="module" src="${viteDevServer}/main.js"></script>
        `
    }

    // En producción leemos el manifest
    const manifestPath = path.join(
        __dirname,
        '..',
        '..',
        'dist',
        'vite',
        'manifest.json'
    )

    // Si no existe el manifest
    if (!fs.existsSync(manifestPath)) {
        console.warn(
            "Vite manifest not found. Run 'npm run build' to generate it."
        )
        return ''
    }

    // Leer y parsear el manifest
    const manifest = JSON.parse(
        fs.readFileSync(manifestPath, 'utf-8')
    )

    const mainEntry = manifest['main.js']

    // Verificar que main.js exista
    if (!mainEntry) {
        console.warn(
            'Archivo main.js no está disponible en el manifiesto de Vite'
        )
        return ''
    }

    let tags = ''

    // Archivos CSS
    if (mainEntry.css) {
        mainEntry.css.forEach((cssFile) => {
            tags += `<link rel="stylesheet" href="/${cssFile}">\n`
        })
    }

    // Archivo JavaScript
    tags += `<script type="module" src="/${mainEntry.file}"></script>\n`

    return tags
}

/**
 * Función registradora del Helper de Handlebars
 */
export function registerViteHelper(hbs) {
    hbs.registerHelper('viteAssets', () => {
        return new hbs.SafeString(viteAssets())
    })
}