// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/authMiddleware');

router.post('/register', userController.guardarUsuario);

router.post('/login', userController.loginUsuario); 

router.get('/me', auth.verificarToken, userController.obtenerPerfilUsuario);

router.get('/', 
    auth.verificarToken,
    auth.verificarRol('admin'),
    userController.obtenerUsuarios
);

module.exports = router;

