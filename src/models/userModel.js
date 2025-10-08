// models/userModel.js
const db = require('../db');

// Buscar usuario por correo
async function obtenerUsuarioPorCorreo(correo) {
  const query = 'SELECT * FROM "Usuarios" WHERE email = $1'; 
  const result = await db.query(query, [correo]);
  return result.rows[0] || null;
}

// Insertar un nuevo usuario
async function insertarUsuario(nombre, correo, hashedPassword) {
  const query = 'INSERT INTO "Usuarios" (nombre, email, contraseña) VALUES ($1, $2, $3) RETURNING *';
  const values = [nombre, correo, hashedPassword];
  const result = await db.query(query, values);
  return result.rows[0];
}

// Obtener todos los usuarios
async function obtenerUsuarios() {
  const query = 'SELECT * FROM "Usuarios"';
  const result = await db.query(query);
  return result.rows;
}

async function obtenerUsuarioPorId(id) {
    const query = 'SELECT * FROM "Usuarios" WHERE id = $1'; 
    const result = await db.query(query, [id]);
    return result.rows[0] || null;
}

module.exports = {
  obtenerUsuarioPorCorreo,
  insertarUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
};