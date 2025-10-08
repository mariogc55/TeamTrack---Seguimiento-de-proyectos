// server.js (o app.js, si lo renombras)

const express = require('express');
const cors = require('cors');
const config = require('./config'); 
require('./db'); 

const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send('Servidor TeamTrack API está ejecutándose.');
});

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

module.exports = app; 
