// src/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middlewares/authMiddleware');

const adminRol = auth.verificarRol('admin'); 

// Tareas: Crear/Ver (CRUD completo solo para Admin)

router.post('/', auth.verificarToken, adminRol, taskController.postCrearTarea);

router.get('/', auth.verificarToken, adminRol, taskController.getTareas);

router.get('/:id', auth.verificarToken, adminRol, taskController.getTareaPorId);

router.put('/:id', auth.verificarToken, adminRol, taskController.putActualizarTarea);

router.patch('/:id', auth.verificarToken, taskController.patchActualizarProgreso);

router.delete('/:id', auth.verificarToken, adminRol, taskController.deleteTarea);

module.exports = router;