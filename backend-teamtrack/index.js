

const app = require('./src/server.js'); 
const config = require('./src/config.js'); 

const port = config.app.port;

app.listen(port, ()=> {
    console.log(`o7 Servidor TeamTrack escuchando en http://localhost:${port}`);
    console.log(`Rutas de Usuario disponibles en: http://localhost:${port}/api/users`);
});