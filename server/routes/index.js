import express from 'express';
const router = express.Router();

let counter = 0;

/* GET home page. */
router.get('/', function(req, res) {
  counter++;
  res.render('index', { 
    title: 'Andre Bonilla',
    counter: counter,
    numbers: [1] // Pasa el arreglo para ejecutar el bucle
  });
});

export default router;