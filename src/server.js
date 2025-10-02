// server.js (o app.js, si lo renombras)

const express = require('express');
const cors = require('cors');
const config = require('./config'); 
require('./db'); 

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

// 1. Middlewares Globales
app.use(cors()); 
app.use(express.json()); 

// 2. Definición de Rutas Base
app.get('/', (req, res) => {
    res.send('Servidor TeamTrack API está ejecutándose.');
});

// 3. Conectar el Módulo de Rutas de Usuarios
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

// 4. ¡IMPORTANTE! Exportar la app, NO iniciar el servidor aquí.
module.exports = app; 

// (Eliminar la sección de app.listen() de este archivo)