//funcion para marcar errores 
//var createError = require('http-errors');
import createError from 'http-errors';
//Importa el framework express
//var express = require('express');
import express from 'express';
//importa modulos para manejar rutas, cookies y logs
//var path = require('path');
import path from 'node:path';
///importa modulos para manejar cookies y logs
//var cookieParser = require('cookie-parser');
import cookieParser from 'cookie-parser';
//importa modulos para manejar logs
//var logger = require('morgan');
import logger from 'morgan';

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// crear la aplicacion de express
var app = express();

// configurar el motor de plantillas y la carpeta de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// configurar middlewares para la aplicacion
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '.. ', 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
