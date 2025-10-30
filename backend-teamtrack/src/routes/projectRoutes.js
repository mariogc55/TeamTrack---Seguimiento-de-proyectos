const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middlewares/authMiddleware');

const adminRol = auth.verificarRol('admin');

router.post('/', auth.verificarToken, adminRol, projectController.postCrearProyecto);

router.get('/', auth.verificarToken, adminRol, projectController.getProyectos);

router.get('/:id', auth.verificarToken, adminRol, projectController.getProyectoPorId);

router.put('/:id', auth.verificarToken, adminRol, projectController.putActualizarProyecto);

router.delete('/:id', auth.verificarToken, adminRol, projectController.deleteProyecto);

module.exports = router;