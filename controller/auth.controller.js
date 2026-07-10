const prisma = require('../prisma/client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Leer eN secreto desde el archivo .env para cumplir con la rúbrica
const SECRET = process.env.JWT_SECRET || 'reina123'


// POST /api/auth/register
const registro = async (req, res) => {
   try{
     const { nombre, correo, password } = req.body

    // verificar si el correo ya existe
    const existe = await prisma.usuario.findUnique({
        where: { correo }
    })

    if (existe) {
        return res.status(400).json({ error: 'El correo ya está registrado' })
    }

    // encriptar la password
    const passwordEncriptada = await bcrypt.hash(password, 10)

    // crear el usuario
    const nuevoUsuario = await prisma.usuario.create({
        data: {
            nombre,
            correo,
            password: passwordEncriptada //aqui se guarda la contraseña ya como secreta
        }
    })

    res.status(201).json({
        message: 'Usuario registrado exitosamente',
        usuario: {
            id: nuevoUsuario.id,
            nombre: nuevoUsuario.nombre,
            correo: nuevoUsuario.correo,
            rol: nuevoUsuario.rol
        }
    })
}catch (error) {
        res.status(500).json({ error: 'Error en el servidor al registrar usuario' })
    }
}
// POST /api/auth/login
const login = async (req, res) => {
    try{
        const { correo, password } = req.body

    if (!correo || !password) {
        return res.status(400).json({ error: 'Correo y password son requeridos' })
    }

    // buscar el usuario
    const usuario = await prisma.usuario.findUnique({
        where: { correo }
    })

    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    // verificar la password
    const passwordValida = await bcrypt.compare(password, usuario.password)

    if (!passwordValida) {
        return res.status(401).json({ error: 'Password incorrecta' })
    }

    // generar el token con el PAYLOAD, recibimos el PAYLOAD (datos del usuario)
    // SECRET es la firma secreta que usa el servidor para generar y verificar el token
    // en este caso va expirar en 8 horas
    const token = jwt.sign(
        { id: usuario.id, correo: usuario.correo, rol: usuario.rol },
        SECRET,
        { expiresIn: '8h' }
    )

    res.status(200).json({
        message: 'Login exitoso',
        token
    })
} catch(error){
    res.status(500).json({ error: 'Error en el servidor al iniciar sesión' })
   }
}



// 🟢 endpoint del PERFIL- GET /api/auth/perfil (Solicitado en la guía)
const perfil = async (req, res) => {
    try {
        // req.user vendrá inyectado desde el middleware de autenticación que harás en el Paso 5
        const usuario = await prisma.usuario.findUnique({
            where: { id: req.user.id }
        })

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }

        // Devolver datos seguros sin la contraseña
        res.status(200).json({
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol
        })
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el perfil' })
    }
}

module.exports = { registro, login, perfil }