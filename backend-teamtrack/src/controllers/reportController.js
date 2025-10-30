const PDFDocument = require('pdfkit');
const projectModel = require('../models/projectModel');
const taskModel = require('../models/taskModel');

async function generarReporteProyecto(req, res) {
    const projectId = req.params.id;

    try {
        const proyecto = await projectModel.obtenerProyectoPorId(projectId);
        if (!proyecto) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }

        const tareas = await taskModel.obtenerTareasPorProyecto(projectId);
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=Reporte_Proyecto_${proyecto.nombre.replace(/\s/g, '_')}.pdf`);

        const doc = new PDFDocument();

        doc.pipe(res);

        // contenido del PDF 

        doc.fontSize(20).text(`Reporte de Proyecto: ${proyecto.nombre}`, { align: 'center' });
        doc.moveDown(0.5);
        
        doc.fontSize(12).text(`Líder: ${proyecto.nombre_lider}`);
        doc.text(`Descripción: ${proyecto.descripcion}`);
        doc.text(`Creación: ${new Date(proyecto.fecha_creacion).toLocaleDateString()}`);
        doc.moveDown(1);
        
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

        doc.end();

    } catch (error) {
        console.error('Error al generar el reporte:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al generar el reporte.' });
    }
}

module.exports = {
    generarReporteProyecto,
};