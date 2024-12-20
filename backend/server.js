// Cargar las variables de entorno desde el archivo .env
require('dotenv').config();

// Requiere las dependencias necesarias
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const commentsRouter = require('./comments'); // Importar las rutas de comentarios

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para manejar JSON y CORS
app.use(express.json());
app.use(cors());

// Conexión a la base de datos MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);  // Ya no es necesario incluir useNewUrlParser y useUnifiedTopology
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.error('Error de conexión a la base de datos:', error);
        process.exit(1); // Termina el proceso si no se puede conectar a la base de datos
    }
};
connectDB();

// Rutas principales
app.get('/', (req, res) => {
    res.send('Backend is running successfully');
});

// Rutas de comentarios
app.use('/api/comments', commentsRouter);  // Usar las rutas de comentarios

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
