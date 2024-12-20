// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Requiere las dependencias necesarias
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const commentsRouter = require('./comments');
const winston = require('winston');
const { createLogger, format, transports } = winston;
const { LogstashTransport } = require('winston-logstash-transport'); // Importa LogstashTransport

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración del logger
const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        // Log a consola
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),
        // Log a Logstash usando LogstashTransport
        new LogstashTransport({
            host: 'localhost', // Cambia 'localhost' al host correcto de Logstash
            port: 5000,        // Cambia 5000 al puerto configurado en Logstash
            applicationName: 'backend'
        })
    ]
});

// Middleware para logging de requests
app.use((req, res, next) => {
    logger.info('Incoming request', {
        method: req.method,
        path: req.path,
        ip: req.ip,
        headers: req.headers
    });
    next();
});

// Middleware para manejar JSON y CORS
app.use(express.json());
app.use(cors());

// Conexión a la base de datos MongoDB con logging
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        logger.info('Database connection successful');
    } catch (error) {
        logger.error('Database connection error', {
            error: error.message,
            stack: error.stack
        });
        process.exit(1);
    }
};

connectDB();

// Middleware para logging de errores de MongoDB
mongoose.connection.on('error', (err) => {
    logger.error('MongoDB error', {
        error: err.message,
        stack: err.stack
    });
});

// Rutas principales
app.get('/', (req, res) => {
    logger.info('Health check endpoint accessed');
    res.send('Backend is running successfully');
});

// Rutas de comentarios
app.use('/api/comments', commentsRouter);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
    logger.error('Application error', {
        error: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method
    });
    res.status(500).json({ error: 'Internal Server Error' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    logger.info(`Server started`, {
        port: PORT,
        env: process.env.NODE_ENV || 'development'
    });
});

// Manejo de señales de terminación
process.on('SIGTERM', () => {
    logger.info('SIGTERM received. Performing graceful shutdown');
    process.exit(0);
});

process.on('uncaughtException', (err) => {
    logger.error('Uncaught exception', {
        error: err.message,
        stack: err.stack
    });
    process.exit(1);
});
