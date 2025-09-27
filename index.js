// index.js

// Antes: const app = require('./server.js'); 
// Antes: const config = require('./config.js'); 

// AHORA: Si los moviste a 'src/', tienes que usar la ruta relativa correcta:
const app = require('./src/server.js'); 
const config = require('./src/config.js'); 

const port = config.app.port;

// Inicializar nuestro servidor 
app.listen(port, ()=> {
    console.log(`🚀 Servidor TeamTrack escuchando en http://localhost:${port}`);
    console.log(`Rutas de Usuario disponibles en: http://localhost:${port}/api/users`);
});