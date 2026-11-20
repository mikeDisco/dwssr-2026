import express from "express";
import {
testLogs,
testException,
testRejection,
} from "./diagnostics.controller.js"

const diagRouter = express.Router();

// Test de niveles de log
// GET /test-logs
diagRouter.get('/test-logs', testLogs);

// Prueba de manejo de exceptions y rejections

// Prueba de exceptions
//GET /test-exception
diagRouter.get("/test-exception", testException);
//Prueba de la rejection
//GET /test-rejection
diagRouter.get("/test-rejection", testRejection);

export default diagRouter;