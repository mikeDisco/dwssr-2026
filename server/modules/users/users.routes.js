//Importando modulos de express
import express from 'express';

import getUsers from './users.controller.js';

//Creando un enrutador de express
const UsersRouter = express.Router();

//Enrutando GET "/users"
UsersRouter.get("/", getUsers);

export default UsersRouter;