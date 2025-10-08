// server.js (o app.js, si lo renombras)

const express = require('express');
const cors = require('cors');
const config = require('./config'); 
require('./db'); 

// importar rutas
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// middlewares globales
app.use(cors()); 
app.use(express.json()); 

// definición rutas base
app.get('/', (req, res) => {
    res.send('Servidor TeamTrack API está ejecutándose.');
});

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);


// ¡IMPORTANTE! Exportar la app, NO iniciar el servidor aquí.
module.exports = app; 