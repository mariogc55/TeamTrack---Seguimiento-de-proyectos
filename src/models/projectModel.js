// src/models/projectModel.js
const db = require('../db');

// Crear un nuevo proyecto
async function crearProyecto(nombre, descripcion, idLider) {
    const query = 'INSERT INTO "Proyectos" (nombre, descripcion, id_lider) VALUES ($1, $2, $3) RETURNING *';
    const values = [nombre, descripcion, idLider];
    const result = await db.query(query, values);
    return result.rows[0];
}

// Obtener todos los proyectos (se puede filtrar luego, por ahora todos)
async function obtenerProyectos() {
    // Usamos JOIN para obtener el nombre del líder del proyecto en lugar de solo su ID
    const query = `
        SELECT 
            p.*, 
            u.nombre AS nombre_lider 
        FROM "Proyectos" p
        LEFT JOIN "Usuarios" u ON p.id_lider = u.id
        ORDER BY p.fecha_creacion DESC
    `;
    const result = await db.query(query);
    return result.rows;
}

// Obtener un proyecto por ID
async function obtenerProyectoPorId(id) {
    const query = `
        SELECT 
            p.*, 
            u.nombre AS nombre_lider 
        FROM "Proyectos" p
        LEFT JOIN "Usuarios" u ON p.id_lider = u.id
        WHERE p.id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

// Actualizar un proyecto
async function actualizarProyecto(id, nombre, descripcion, idLider) {
    const query = 'UPDATE "Proyectos" SET nombre = $1, descripcion = $2, id_lider = $3 WHERE id = $4 RETURNING *';
    const values = [nombre, descripcion, idLider, id];
    const result = await db.query(query, values);
    return result.rows[0];
}

// Eliminar un proyecto
async function eliminarProyecto(id) {
    const query = 'DELETE FROM "Proyectos" WHERE id = $1 RETURNING id';
    const result = await db.query(query, [id]);
    return result.rows[0];
}

module.exports = {
    crearProyecto,
    obtenerProyectos,
    obtenerProyectoPorId,
    actualizarProyecto,
    eliminarProyecto,
};