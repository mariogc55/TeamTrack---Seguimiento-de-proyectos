// src/controllers/projectController.js
const projectModel = require('../models/projectModel');

// [POST] Crear nuevo proyecto
async function postCrearProyecto(req, res) {
    // id_lider puede venir del cuerpo o del token JWT (req.user.id) si el creador es el líder
    const { nombre, descripcion, id_lider } = req.body; 

    // Aquí se podría añadir validación, por simplicidad asumimos que los datos son válidos
    if (!nombre || !id_lider) {
        return res.status(400).json({ error: 'Faltan campos obligatorios: nombre e id_lider.' });
    }

    try {
        const nuevoProyecto = await projectModel.crearProyecto(nombre, descripcion, id_lider);
        res.status(201).json(nuevoProyecto);
    } catch (error) {
        console.error('Error al crear el proyecto:', error);
        res.status(500).json({ error: 'Error interno del servidor al crear el proyecto.' });
    }
}

// [GET] Obtener todos los proyectos
async function getProyectos(req, res) {
    try {
        const proyectos = await projectModel.obtenerProyectos();
        res.status(200).json(proyectos);
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener proyectos.' });
    }
}

// [GET] Obtener proyecto por ID
async function getProyectoPorId(req, res) {
    const { id } = req.params;
    try {
        const proyecto = await projectModel.obtenerProyectoPorId(id);
        if (!proyecto) {
            return res.status(404).json({ error: 'Proyecto no encontrado.' });
        }
        res.status(200).json(proyecto);
    } catch (error) {
        console.error('Error al obtener proyecto por ID:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

// [PUT] Actualizar proyecto
async function putActualizarProyecto(req, res) {
    const { id } = req.params;
    const { nombre, descripcion, id_lider } = req.body;
    
    // Aquí se podría validar si el usuario logueado es el líder o un admin
    try {
        const proyectoActualizado = await projectModel.actualizarProyecto(id, nombre, descripcion, id_lider);
        if (!proyectoActualizado) {
            return res.status(404).json({ error: 'Proyecto no encontrado para actualizar.' });
        }
        res.status(200).json(proyectoActualizado);
    } catch (error) {
        console.error('Error al actualizar proyecto:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

// [DELETE] Eliminar proyecto
async function deleteProyecto(req, res) {
    const { id } = req.params;
    try {
        const proyectoEliminado = await projectModel.eliminarProyecto(id);
        if (!proyectoEliminado) {
             return res.status(404).json({ error: 'Proyecto no encontrado para eliminar.' });
        }
        res.status(200).json({ message: 'Proyecto eliminado con éxito.', id: proyectoEliminado.id });
    } catch (error) {
        console.error('Error al eliminar proyecto:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}


module.exports = {
    postCrearProyecto,
    getProyectos,
    getProyectoPorId,
    putActualizarProyecto,
    deleteProyecto,
};