import express from 'express';

const indexRouter = express.Router();

let counter = 0;

/* GET home page. */
indexRouter.get('/', (req, res) => {
  counter+= 1;
  res.render('index', { 
    title: 'Andre Bonilla',
    counter,
    numbers: [1] // Pasa el arreglo para ejecutar el bucle
  });
});

export default indexRouter;