import createError from 'http-errors';
import express from 'express';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import createDebug from 'debug';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import hbs from 'hbs';

import indexRouter from '#routes/index.js';
import usersRouter from '#routes/users.js';
import { registerHelpers } from './lib/vite.js';

const debug = createDebug('dwssr-2026:server');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

debug("🔨 Creando backend");
const app = express();

// Configurar motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Registrar helpers de Handlebars
registerHelpers(hbs);

// Middlewares estándar
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Integración de Vite en modo desarrollo vs producción
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
}

debug("🔨 Creando servidor de archivos estaticos");
app.use(express.static(path.join(__dirname, '..', 'public')));

debug("📁 Registando rutas");
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Manejo de errores 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador general de errores
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;