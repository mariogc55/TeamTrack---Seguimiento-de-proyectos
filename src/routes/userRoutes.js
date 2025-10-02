// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

// --- Rutas Públicas (Registro y Login) ---

// POST /api/users/register - Registrar un nuevo usuario (Ya existe)
router.post('/register', userController.guardarUsuario);

// POST /api/users/login - Iniciar sesión y obtener un token JWT
router.post('/login', userController.loginUsuario); 


// --- Rutas Protegidas ---

// Nueva ruta para obtener el perfil del usuario logueado
router.get('/me', auth.verificarToken, userController.obtenerPerfilUsuario);

// GET /api/users - Obtener todos los usuarios
router.get('/', 
    auth.verificarToken,            // 1. Debe tener un token válido
    auth.verificarRol('admin'),     // 2. Debe tener el rol de 'admin'
    userController.obtenerUsuarios
);

module.exports = router;
