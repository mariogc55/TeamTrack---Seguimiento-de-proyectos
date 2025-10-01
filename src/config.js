// src/config.js
const path = require('path');
const dotenv = require('dotenv'); // <-- ¡DEFINIR LA VARIABLE!

dotenv.config({ 
    // Usar path.resolve para buscar el .env en la raíz (subir un nivel)
    path: path.resolve(__dirname, '..', '.env') 
});

module.exports = {
    // Configuración del Servidor
    app: {
        port: process.env.PORT || 4000,
        // Configuración de Seguridad
        jwtSecret: process.env.JWT_SECRET || 'mi_clave_secreta_por_defecto',
    },
    // Configuración de la Base de Datos (PostgreSQL)
    db: {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'teamtrack_db',
        password: process.env.DB_PASSWORD || '12345',
        port: process.env.DB_PORT || 5432,
    }
};