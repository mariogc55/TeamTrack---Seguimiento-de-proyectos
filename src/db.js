// db.js

const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port, 
});

// prueba conexion
pool.connect((err, client, release) => {
    if (err) {
        return console.error('❌ Error al conectar con PostgreSQL:', err.stack);
    }
    console.log('✅ Conexión exitosa a PostgreSQL:', config.db.database);
    release();
});


// Exportar una función de utilidad para ejecutar queries
module.exports = {
  query: (text, params) => pool.query(text, params),
  pool: pool, // exportamos el pool si se necesita acceso directo

};
