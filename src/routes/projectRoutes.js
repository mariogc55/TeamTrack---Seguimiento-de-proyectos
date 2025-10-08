// src/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middlewares/authMiddleware'); // Middleware de seguridad

const adminRol = auth.verificarRol('admin'); // Alias para la verificación de admin

// Rutas de Proyectos

// Crear un nuevo proyecto (Solo Admin)
router.post('/', auth.verificarToken, adminRol, projectController.postCrearProyecto);

// Obtener todos los proyectos (Solo Admin por ahora, podría cambiarse a Miembros)
router.get('/', auth.verificarToken, adminRol, projectController.getProyectos);

// Obtener un proyecto específico por ID (Solo Admin)
router.get('/:id', auth.verificarToken, adminRol, projectController.getProyectoPorId);

// Actualizar un proyecto (Solo Admin)
router.put('/:id', auth.verificarToken, adminRol, projectController.putActualizarProyecto);

// Eliminar un proyecto (Solo Admin)
router.delete('/:id', auth.verificarToken, adminRol, projectController.deleteProyecto);

module.exports = router;