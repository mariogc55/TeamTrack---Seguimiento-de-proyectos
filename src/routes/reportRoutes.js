// src/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const auth = require('../middlewares/authMiddleware'); 

// genera y descarga reporte
router.get('/project/:id', 
    auth.verificarToken, 
    auth.verificarRol('admin'), 
    reportController.generarReporteProyecto
);


module.exports = router;
