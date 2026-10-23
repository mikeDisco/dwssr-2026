import express from 'express';

const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', (req, res, _next) => {
  res.send('<h1 style="color: red;">Lista de amigos</h1>');
});

export default usersRouter;
