// models/userModel.js
const db = require('../db');

async function obtenerUsuarioPorCorreo(correo) {
  const query = 'SELECT * FROM "Usuarios" WHERE email = $1'; 
  const result = await db.query(query, [correo]);
  return result.rows[0] || null;
}

async function insertarUsuario(nombre, correo, hashedPassword) {
  const query = 'INSERT INTO "Usuarios" (nombre, email, contraseña) VALUES ($1, $2, $3) RETURNING *';
  const values = [nombre, correo, hashedPassword];
  const result = await db.query(query, values);
  return result.rows[0];
}

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
