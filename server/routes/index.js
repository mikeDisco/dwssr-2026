import express from 'express';
const router = express.Router();

let counter = 0;

/* GET home page. */
router.get('/', function(req, res) {
  counter++;
  res.render('index', { 
    title: 'Adrian Rocha',
    counter: counter 
  });
});

export default router;