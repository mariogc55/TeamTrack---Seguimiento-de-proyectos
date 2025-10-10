// src/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middlewares/authMiddleware'); 

// GET /api/reports/project/:id - Generar y descargar reporte de un proyecto
router.get('/project/:id', 
    auth.verificarToken, 
    auth.verificarRol('admin'), 
    reportController.generarReporteProyecto
);

module.exports = router;