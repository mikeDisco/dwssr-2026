//Importando modulos de express
import express from  'express'

//Importando la accion que quiero enrutar
import renderHome from './home.controller.js';

//Creando un enrutador de express
const HomeRouter = express.Router();

//enrutando Action Methods del controlador Home

// Get "/"
HomeRouter.get('/', renderHome)

export default HomeRouter;