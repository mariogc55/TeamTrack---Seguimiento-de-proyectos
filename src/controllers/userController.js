const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

async function loginUsuario(req, res) {
    const { correo, password } = req.body;

    try {
        const usuario = await userModel.obtenerUsuarioPorCorreo(correo);
        
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, usuario.contraseña);

        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const payload = {
            id: usuario.id,
            email: usuario.email,
            rol: usuario.rol
        };

        const token = jwt.sign(
            payload, 
            config.app.jwtSecret, 
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            token: token,
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });

    } catch (error) {
        console.error('Error durante el login:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function guardarUsuario(req, res) {
    const { nombre, correo, password } = req.body;

    try {
        const existeUsuario = await userModel.obtenerUsuarioPorCorreo(correo);
        if (existeUsuario) {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }


        const salt = await bcrypt.genSalt(10);
        
        const hashedPassword = await bcrypt.hash(password, salt); 


        const nuevoUsuario = await userModel.insertarUsuario(nombre, correo, hashedPassword);
        
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        console.error('Error al guardar el usuario:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function obtenerUsuarios(req, res) {
    try {
        const usuarios = await userModel.obtenerUsuarios();
        
        const usuariosSinContraseña = usuarios.map(usuario => {
            const { contraseña, ...usuarioLimpio } = usuario; 
            return usuarioLimpio;
        });

        res.status(200).json(usuariosSinContraseña);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

async function obtenerPerfilUsuario(req, res) {
    try {
        const userId = req.user.id; 
        
        const usuario = await userModel.obtenerUsuarioPorId(userId);

        if (!usuario) {
             return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        const { contraseña, ...perfilLimpio } = usuario;
        
        res.status(200).json(perfilLimpio);

    } catch (error) {
        console.error('Error al obtener el perfil:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    guardarUsuario,
    obtenerUsuarios,
    loginUsuario,
    obtenerPerfilUsuario,

};
