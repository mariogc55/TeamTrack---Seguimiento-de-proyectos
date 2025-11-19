const taskModel = require('../models/taskModel');

async function getTasksByProject(req, res) {
    const projectId = req.params.projectId;

    try {
        const tareas = await taskModel.obtenerTareasPorProyecto(projectId);
        res.status(200).json(tareas); 
    } catch (error) {
        console.error('Error al obtener tareas por proyecto:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al obtener tareas por proyecto.' }); 
    }
}

async function postCrearTarea(req, res) {
    const { id_proyecto, titulo, descripcion, fecha_limite, id_asignado_a } = req.body; 

    if (!id_proyecto || !titulo || !id_asignado_a) {
        return res.status(400).json({ error: 'Faltan campos obligatorios: id_proyecto, titulo, e id_asignado_a.' });
    }

    try {
        const nuevaTarea = await taskModel.crearTarea(id_proyecto, titulo, descripcion, fecha_limite, id_asignado_a);
        res.status(201).json(nuevaTarea);
    } catch (error) {
        console.error('Error al crear la tarea:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al crear la tarea.' });
    }
}

async function getTareas(req, res) {
    try {
        const tareas = await taskModel.obtenerTareas();
        res.status(200).json(tareas);
    } catch (error) {
        console.error('Error al obtener tareas:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al obtener tareas.' });
    }
}

async function getTareaPorId(req, res) {
    const { id } = req.params;
    try {
        const tarea = await taskModel.obtenerTareaPorId(id);
        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada.' });
        }
        res.status(200).json(tarea);
    } catch (error) {
        console.error('Error al obtener tarea por ID:', error.message);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

async function putActualizarTarea(req, res) {
    const { id } = req.params;
    const { titulo, descripcion, fecha_limite, porcentaje_progreso, estado, id_asignado_a } = req.body;
    
    try {
        const tareaActualizada = await taskModel.actualizarTarea(id, titulo, descripcion, fecha_limite, porcentaje_progreso, estado, id_asignado_a);
        if (!tareaActualizada) {
            return res.status(404).json({ error: 'Tarea no encontrada para actualizar.' });
        }
        res.status(200).json(tareaActualizada);
    } catch (error) {
        console.error('Error al actualizar tarea:', error.message);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

async function patchActualizarProgreso(req, res) {
    const { id } = req.params;
    const { porcentaje_progreso, estado } = req.body;

    if (porcentaje_progreso === undefined || estado === undefined) {
        return res.status(400).json({ error: 'Faltan campos obligatorios: porcentaje_progreso y estado.' });
    }

    try {
        const tareaActualizada = await taskModel.actualizarEstadoProgreso(id, porcentaje_progreso, estado);
        if (!tareaActualizada) {
            return res.status(404).json({ error: 'Tarea no encontrada para actualizar progreso.' });
        }
        res.status(200).json(tareaActualizada);
    } catch (error) {
        console.error('Error al actualizar progreso:', error.message);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}


async function deleteTarea(req, res) {
    const { id } = req.params;
    try {
        const tareaEliminada = await taskModel.eliminarTarea(id);
        if (!tareaEliminada) {
            return res.status(404).json({ error: 'Tarea no encontrada para eliminar.' });
        }
        res.status(200).json({ message: 'Tarea eliminada con éxito.', id: tareaEliminada.id });
    } catch (error) {
        console.error('Error al eliminar tarea:', error.message);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}


module.exports = {
    postCrearTarea,
    getTareas,
    getTareaPorId,
    putActualizarTarea,
    patchActualizarProgreso,
    deleteTarea,
    getTasksByProject, 
};