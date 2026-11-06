// Funcion para manejar errores
// ❌var createError = require('http-errors');
import createError from 'http-errors';
// Importa el framework express
// ❌var express = require('express');
import express from 'express';
// Importa modulos para manejar rutas y dirname
// ❌var path = require('path');
import path, { dirname } from 'node:path';
// Importa modulos para manejar cookies
// ❌var cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser';
// Importa modulos para manejar logs
// ❌var logger = require('morgan');
import morgan from 'morgan';
// importando biblioteca de debug
//import createDebug from 'debug';
// Imports para crear dirname
import { fileURLToPath } from 'node:url';



// Importan las rutas de la aplicacion
// var indexRouter = require('./routes/index');
import indexRouter from '#routes/index.js'; // eslint-disable-line import-x/no-rename-default
// var usersRouter = require('./routes/users');
import usersRouter from '#routes/users.js';  
//importando la funcion de configuracion de Hbs
import configureHandlebars from './lib/handlebars.js';
// Importando la configuracion de winston logger
import logger from "./lib/winston.js"

// Creacion del objeto debug
//const debug = createDebug('dwssr-2026:server');
// Creando las variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crear la aplicacion express
//Creando backend
logger.info('🔨  Creando backend');
// Crea la aplicacion express
const app = express();

// Configura el motor de vistas con hbs
configureHandlebars(app)

// Configura middlewares de la aplicacion
app.use(morgan('dev', { stream: { write: (msg) => logger.info(msg.trim()) } }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Archivos estaticos para produccion
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
}

// Configura la carpeta de archivos estaticos
logger.info('🔨  Creando servidor de archivos estaticos');
app.use(express.static(path.join(__dirname, '..', 'public')));

// Registramos rutas de la aplicacion
logger.info('🛣️ Registrando rutas');
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Manejador de errores
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? {
    status: err.status || 500,
    stack: err.stack
  } : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
export default app;