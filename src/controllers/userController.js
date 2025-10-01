const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

async function guardarUsuario(req, res) {
    const { nombre, correo, password } = req.body;

    try {
        // Verificar si ya existe el correo
        const existeUsuario = await userModel.obtenerUsuarioPorCorreo(correo);
        if (existeUsuario) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }

        // --- INICIO DE LOS CAMBIOS DE SEGURIDAD ---

        // Generar un 'salt' (valor aleatorio para asegurar el hash)
        // La fuerza de 10 es un buen balance entre seguridad y velocidad.
        const salt = await bcrypt.genSalt(10); 
        
        // Hashear la contraseña recibida
        const hashedPassword = await bcrypt.hash(password, salt); 

        // --- FIN DE LOS CAMBIOS DE SEGURIDAD ---

        // Guardar el nuevo usuario, usando la contraseña HASHEADA
        const nuevoUsuario = await userModel.insertarUsuario(nombre, correo, hashedPassword);
        
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Error al guardar el usuario:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// Controlador para obtener todos los usuarios
async function obtenerUsuarios(req, res) {
    try {
        const usuarios = await userModel.obtenerUsuarios();
        
        // Nota: Considera eliminar el campo 'password' de cada usuario aquí antes de enviarlo.
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    guardarUsuario,
    obtenerUsuarios,
};