import express from 'express';
import logger from '../lib/winston.js'

const router = express.Router();

let counter = 0;
const numbers = [];
/* GET home page. */
router.get('/', (req, res, _next) => {
  counter += 1;
  numbers.push(counter);
  res.render('index', {
    title: 'Mike Bonilla',
    counter,
    numbers,
  });
});


//Rutas para prueba de logs
//Acceder al get /test-logs
router.get("/test-logs", (req,res)=>{
  logger.error("Esto es un mensaje de ERROR - algo fallo");
  logger.warn("Esto es un mensaje de WARN - algo podria estar mal");
  logger.info("Esto es un mensaje de INFO - operacion exitosa");
  logger.http("Esto es un mensaje de HTTP - peticion recibida");
  logger.debug("Esto es un mensaje de DEBUG - detalle de depuracion");

  res.json({
    message: "Logs de prueba generados. Revisa la consola y los archivos en /logs",
    files:[
      "logs/app-YYYY-MM-DD.log -> DailyRotateFile (info+warn+error en JSON)",
      "logs/app-readable.log -> Formato legible (info+warn+error)",
      "logs/error.log ->Solo errores",
    ]
  })
})

// Rutas de prueba para exceptions y rejections
if(process.env.NODE_ENV !== "production"){

  //Ruta de prueba de excepciones
  router.get("/test-exception", (req,res)=>{
    res.json({message: "Excepcion lanzada. Revisa logs/exceptions.log"})
    setTimeout(()=>{
      throw new Error("Excepcion de prueba no capturada")
    },100)
  })

//Prueba de una rejection
 router.get("/test-rejection", (req,res)=>{
    res.json({message: "Promesa rechazada, revisa archivo logs/rejections.log"})
   //Promesa rechazada sin catch
   Promise.reject(new Error("Promesa rechazada de prueba sin catch"));
  });
}

//module.exports = router
export default router;