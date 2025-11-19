
const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool({
  user: config.db.user,
  host: config.db.host,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port, 
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error al conectar con PostgreSQL:', err.stack);
    }
    console.log('Conexión exitosa a PostgreSQL:', config.db.database);
    release();
});


module.exports = {
  query: (text, params) => pool.query(text, params),
  pool: pool,
};