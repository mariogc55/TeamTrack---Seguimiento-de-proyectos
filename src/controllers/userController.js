const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // 1. IMPORTAR JWT
const config = require('../config'); // 2. IMPORTAR CONFIG para JWT_SECRET

async function loginUsuario(req, res) {
    const { correo, password } = req.body;

    try {
        // 1. Buscar el usuario por correo
        const usuario = await userModel.obtenerUsuarioPorCorreo(correo);
        
        // 2. Verificar si el usuario existe
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // 3. Comparar la contraseña hasheada
        // NOTA: El campo en la DB es 'contraseña' (con ñ), debe ser exacto.
        const isMatch = await bcrypt.compare(password, usuario.contraseña);

        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // 4. Generar el Token JWT
        const payload = {
            id: usuario.id,
            email: usuario.email,
            rol: usuario.rol // CLAVE para la autorización
        };

        const token = jwt.sign(
            payload, 
            config.app.jwtSecret, 
            { expiresIn: '1h' } // Token expira en 1 hora
        );

        // 5. Enviar el token al cliente
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

        // --- INICIO DE LOS CAMBIOS DE SEGURIDAD ---

        const salt = await bcrypt.genSalt(10); //streng
        
        const hashedPassword = await bcrypt.hash(password, salt); 

        // --- FIN DE LOS CAMBIOS DE SEGURIDAD ---

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

        // Enviar el nuevo array sin contraseñas
        res.status(200).json(usuariosSinContraseña);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

// Obtener el perfil del usuario logueado (solo ver perfil propio)
async function obtenerPerfilUsuario(req, res) {
    try {
        // req.user viene del payload del JWT (id, email, rol)
        const userId = req.user.id; 
        
        // 1. Crear una función en userModel para buscar por ID
        const usuario = await userModel.obtenerUsuarioPorId(userId);

        if (!usuario) {
             return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        // 2. Filtrar la contraseña antes de responder
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
