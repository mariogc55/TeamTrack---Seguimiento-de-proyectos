// models/userModel.js
const db = require('../db');

// Buscar usuario por correo
async function obtenerUsuarioPorCorreo(correo) {
  // Usamos "Usuarios" (con mayúscula y comillas dobles, como la creaste en SQL)
  const query = 'SELECT * FROM "Usuarios" WHERE email = $1'; 
  const result = await db.query(query, [correo]);
  return result.rows[0] || null;
}

// Insertar un nuevo usuario
async function insertarUsuario(nombre, correo, hashedPassword) {
  // Usamos "Usuarios" y los nombres de las columnas correctos: email, contraseña
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

module.exports = {
  obtenerUsuarioPorCorreo,
  insertarUsuario,
  obtenerUsuarios,
};