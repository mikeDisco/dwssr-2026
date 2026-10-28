// Importar el core de winston
import winston, { format } from 'winston';
// Importando bibliotecas de node
import path from "node:path";
import fs from "node:fs";
// Importando plug-in de winston
import DailyRotateFile from 'winston-daily-rotate-file';

// Desestructurar funciones de format
const { combine, timestamp, label, printf, colorize, prettyPrint } = format;
// Creando variables de directorio raiz
const rootdir = path.resolve(process.cwd());

// Creando directorio de logs
const logsDir = path.join(rootdir, "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Definiendo un esquema de colores
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// Agregando ese esquema a winston
winston.addColors(colors);

// Creando plantillas para los formatos

// Formato de consola
const myConsoleFormat = combine(
  // Colores del formato
  colorize({ all: true }),
  // Agregando una etiqueta 
  label({ label: '📢:' }),
  // Agregando fecha
  timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  // Función de impresión
  printf((info) => `${info.level} ▸ ${info.label} ▸ ${info.timestamp} ▸ ${info.message}`)
);

// Formato para los archivos
const myFileFormat = combine(
  // Retirar colorizacion
  format.uncolorize(),
  // Agregar fecha iso
  timestamp(),
  // Salida
  format.json()
);

// Construyendo y configurando transportes
const options = {
  errorFile: {
    level: 'error',
    filename: path.join(logsDir, 'error.log'),
    maxsize: 5242880, // 5MB
    maxFiles: 2,
    format: myFileFormat,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    format: myConsoleFormat
  },
  readableFile: {
    level: 'info',
    filename: path.join(logsDir, 'readable.log'),
    maxsize: 5242880, // 5MB
    maxFiles: 2,
    format: combine(
      format.uncolorize(),
      timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
      prettyPrint()
    ),
  },
  DailyRotateFile: {
    level: 'info',
    filename: path.join(logsDir, 'app-%DATE%.log'),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxsize: 5242880, // 5MB
    maxFiles: '14d',
    format: myFileFormat
  }
};

// Creando el logger
const logger = winston.createLogger({
  transports: [
    new DailyRotateFile(options.DailyRotateFile),
    new winston.transports.File(options.readableFile),
    new winston.transports.File(options.errorFile),
    new winston.transports.Console(options.console),
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, 'exceptions.log'),
    })
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logsDir, 'rejections.log'),
    })
  ],
  exitOnError: false,
});

export default logger;