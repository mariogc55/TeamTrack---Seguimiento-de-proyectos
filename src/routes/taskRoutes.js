// src/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/authMiddleware'); // Middleware de seguridad

const adminRol = auth.verificarRol('admin'); 

// Tareas: Crear/Ver (CRUD completo solo para Admin)

// POST /api/tasks - Crear una nueva tarea (Solo Admin)
router.post('/', auth.verificarToken, adminRol, taskController.postCrearTarea);

// GET /api/tasks - Obtener todas las tareas (Solo Admin)
router.get('/', auth.verificarToken, adminRol, taskController.getTareas);

// GET /api/tasks/:id - Obtener una tarea específica (Admin)
router.get('/:id', auth.verificarToken, adminRol, taskController.getTareaPorId);

// PUT /api/tasks/:id - Actualizar TODOS los campos de la tarea (Solo Admin)
router.put('/:id', auth.verificarToken, adminRol, taskController.putActualizarTarea);

// PATCH /api/tasks/:id - Actualizar SÓLO progreso/estado (Miembro o Admin)
router.patch('/:id', auth.verificarToken, taskController.patchActualizarProgreso);

// DELETE /api/tasks/:id - Eliminar una tarea (Solo Admin)
router.delete('/:id', auth.verificarToken, adminRol, taskController.deleteTarea);

module.exports = router;