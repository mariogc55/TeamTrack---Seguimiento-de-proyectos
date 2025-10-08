// src/models/taskModel.js
const db = require('../db');

async function crearTarea(idProyecto, titulo, descripcion, fechaLimite, idAsignadoA) {
    const query = `
        INSERT INTO "Tareas" (id_proyecto, titulo, descripcion, fecha_limite, id_asignado_a) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING *
    `;
    const values = [idProyecto, titulo, descripcion, fechaLimite, idAsignadoA];
    const result = await db.query(query, values);
    return result.rows[0];
}

async function obtenerTareas() {
    const query = `
        SELECT 
            t.*, 
            p.nombre AS nombre_proyecto, 
            u.nombre AS nombre_asignado_a
        FROM "Tareas" t
        JOIN "Proyectos" p ON t.id_proyecto = p.id
        LEFT JOIN "Usuarios" u ON t.id_asignado_a = u.id
        ORDER BY t.fecha_creacion DESC
    `;
    const result = await db.query(query);
    return result.rows;
}

async function obtenerTareaPorId(id) {
    const query = `
        SELECT 
            t.*, 
            p.nombre AS nombre_proyecto, 
            u.nombre AS nombre_asignado_a
        FROM "Tareas" t
        JOIN "Proyectos" p ON t.id_proyecto = p.id
        LEFT JOIN "Usuarios" u ON t.id_asignado_a = u.id
        WHERE t.id = $1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0];
}

async function actualizarTarea(id, titulo, descripcion, fechaLimite, porcentajeProgreso, estado, idAsignadoA) {
    const query = `
        UPDATE "Tareas" 
        SET 
            titulo = $1, 
            descripcion = $2, 
            fecha_limite = $3, 
            porcentaje_progreso = $4, 
            estado = $5, 
            id_asignado_a = $6
        WHERE id = $7 
        RETURNING *
    `;
    const values = [titulo, descripcion, fechaLimite, porcentajeProgreso, estado, idAsignadoA, id];
    const result = await db.query(query, values);
    return result.rows[0];
}

async function actualizarEstadoProgreso(id, porcentajeProgreso, estado) {
    const query = `
        UPDATE "Tareas" 
        SET 
            porcentaje_progreso = $1, 
            estado = $2
        WHERE id = $3 
        RETURNING *
    `;
    const values = [porcentajeProgreso, estado, id];
    const result = await db.query(query, values);
    return result.rows[0];
}

async function eliminarTarea(id) {
    const query = 'DELETE FROM "Tareas" WHERE id = $1 RETURNING id';
    const result = await db.query(query, [id]);
    return result.rows[0];
}

module.exports = {
    crearTarea,
    obtenerTareas,
    obtenerTareaPorId,
    actualizarTarea,
    actualizarEstadoProgreso,
    eliminarTarea,
};