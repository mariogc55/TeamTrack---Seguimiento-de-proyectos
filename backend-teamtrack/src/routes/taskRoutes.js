const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/project/:projectId', 
    taskController.getTasksByProject
); 

// rutas de CRUD
router.post('/', taskController.postCrearTarea);
router.get('/', taskController.getTareas);
router.get('/:id', taskController.getTareaPorId);
router.put('/:id', taskController.putActualizarTarea);
router.patch('/:id/progreso', taskController.patchActualizarProgreso);
router.delete('/:id', taskController.deleteTarea);


module.exports = router;