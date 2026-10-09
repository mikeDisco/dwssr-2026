import express from 'express';
const router = express.Router();

let counter = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  counter++;
  res.render('index', { title: 'Andre Bonilla',
    counter: counter
  });
});

export default router;