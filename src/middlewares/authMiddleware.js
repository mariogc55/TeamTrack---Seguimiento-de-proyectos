// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config'); 

function verificarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, config.app.jwtSecret);
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido o expirado.' });
    }
}

function verificarRol(rolRequerido) {
    return (req, res, next) => {
        if (!req.user || req.user.rol !== rolRequerido) {
            return res.status(403).json({ error: 'Acceso prohibido. Rol insuficiente.' });
        }
        next();
    };
}

module.exports = { verificarToken, verificarRol };