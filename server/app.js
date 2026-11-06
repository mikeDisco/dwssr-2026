// Funcion para manejar errores
import createError from 'http-errors';
// Importa el framework express
import express from 'express';
// Importa modulos para manejar rutas y dirname
import path, { dirname } from 'node:path';
// Importa modulos para manejar cookies
import cookieParser from 'cookie-parser';
// Importa modulos para manejar logs
import morgan from 'morgan';
// importando biblioteca de debug
import createDebug from 'debug';
// Imports para crear dirname
import { fileURLToPath } from 'node:url';

// Importando el template engine de Handlebars
import hbs from 'hbs';

// Importan las rutas de la aplicacion
import router from '#routes/index.js';  
import usersRouter from '#routes/users.js';  
// Importando el registrador del Helper (nombre corregido según lib/vite.js)
import { registerViteHelper } from './lib/vite.js';
// Importando la configuracion de winston logger (renombrado para evitar conflicto con morgan)
import logger from "./lib/winston.js";

// Creacion del objeto debug
const debug = createDebug('dwssr-2026:server');
// Creando las variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crear la aplicacion express
debug('🔨  Creando backend');
// Crea la aplicacion express
const app = express();

// Configura el motor de vistas con hbs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// Registro helper corregido
registerViteHelper(hbs);

// Configura middlewares de la aplicacion (usando winstonLogger)
app.use(morgan('dev', { stream: { write: (msg) => logger.info(msg.trim()) } }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Archivos estaticos para produccion
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
}

// Configura la carpeta de archivos estaticos
debug('🔨  Creando servidor de archivos estaticos');
app.use(express.static(path.join(__dirname, '..', 'public')));

// Registramos rutas de la aplicacion (usando router)
debug('🛣️ Registrando rutas');
app.use('/', router);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Manejador de errores
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;