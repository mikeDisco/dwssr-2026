import express from 'express';
const router = express.Router();

let counter = 0;
const numbers = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  counter++;
  numbers.push(counter);
  res.render('index', { 
    title: 'Andre Bonilla',
    counter,
    numbers
  });
});

// ASEGÚRATE DE TENER ESTA LÍNEA AL FINAL:
export default router;