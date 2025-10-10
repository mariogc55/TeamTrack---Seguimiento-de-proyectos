// src/controllers/reportController.js
const PDFDocument = require('pdfkit'); // Importar la librería
const projectModel = require('../models/projectModel');
const taskModel = require('../models/taskModel');

async function generarReporteProyecto(req, res) {
    const projectId = req.params.id; // Obtenemos el ID del proyecto de la URL

    try {
        // 1. Obtener los datos del Proyecto
        const proyecto = await projectModel.obtenerProyectoPorId(projectId);
        if (!proyecto) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }

        // 2. Obtener todas las Tareas asociadas a ese proyecto
        const tareas = await taskModel.obtenerTareasPorProyecto(projectId);
        
        // 3. Configurar la respuesta (Headers para descargar el archivo)
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=Reporte_Proyecto_${proyecto.nombre.replace(/\s/g, '_')}.pdf`);

        // 4. Iniciar la generación del PDF
        const doc = new PDFDocument();

        // Tubería (pipe): Conecta el documento PDF al stream de respuesta HTTP
        doc.pipe(res);

        // --- Contenido del PDF ---

        // Título del Reporte
        doc.fontSize(20).text(`Reporte de Proyecto: ${proyecto.nombre}`, { align: 'center' });
        doc.moveDown(0.5);
        
        // Detalles del Proyecto
        doc.fontSize(12).text(`Líder: ${proyecto.nombre_lider}`);
        doc.text(`Descripción: ${proyecto.descripcion}`);
        doc.text(`Creación: ${new Date(proyecto.fecha_creacion).toLocaleDateString()}`);
        doc.moveDown(1);
        
        // Sección de Tareas
        doc.fontSize(16).text('Tareas Asignadas:', { underline: true });
        doc.moveDown(0.5);

        if (tareas.length === 0) {
            doc.fontSize(12).text('No hay tareas asignadas a este proyecto.');
        } else {
            tareas.forEach(tarea => {
                doc.fontSize(12)
                    .text(`- Título: ${tarea.titulo}`, { continued: true })
                    .text(` | Asignado: ${tarea.nombre_asignado_a}`)
                    .text(`  Progreso: ${tarea.porcentaje_progreso}% (${tarea.estado})`)
                    .text(`  Fecha Límite: ${new Date(tarea.fecha_limite).toLocaleDateString()}`);
                doc.moveDown(0.5);
            });
        }

        // 5. Finalizar y enviar el PDF
        doc.end();

    } catch (error) {
        console.error('Error al generar el reporte:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al generar el reporte.' });
    }
}

module.exports = {
    generarReporteProyecto,
};