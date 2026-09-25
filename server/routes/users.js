import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('<h1 style="color: red;">Lista de amigos</h1>');
});

export default router;
