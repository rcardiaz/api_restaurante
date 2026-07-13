const express = require('express')
const router = express.Router()
const authController = require('../controller/auth.controller')
const { verificarToken } = require('../Middlewares/auth.middleware')

/**
 * @swagger
 * /api/auth/register:
 * post:
 * summary: Registrar un nuevo cliente
 * tags: [Autenticación]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - nombre
 * - correo
 * - password
 * properties:
 * nombre:
 * type: string
 * example: Juan Pérez
 * correo:
 * type: string
 * example: juan@correo.com
 * password:
 * type: string
 * example: password123
 * responses:
 * 201:
 * description: Usuario registrado exitosamente.
 */

//const { registro, login } = require('../controller/auth.controller')

//router.post('/register', registro) // /api/v1/auth/register
//router.post('/login', login) // /api/v1/auth/login

// Rutas públicas
router.post('/register', authController.registro)

/**
 * @swagger
 * /api/auth/login:
 * post:
 * summary: Iniciar sesión de usuario
 * tags: [Autenticación]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - correo
 * - password
 * properties:
 * correo:
 * type: string
 * example: juan@correo.com
 * password:
 * type: string
 * example: password123
 * responses:
 * 200:
 * description: Login exitoso, devuelve el token JWT.
 */
router.post('/login', authController.login)

/**
 * @swagger
 * /api/auth/perfil:
 * get:
 * summary: Obtener el perfil del usuario autenticado
 * tags: [Autenticación]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Datos del perfil del usuario en sesión.
 */
// Ruta protegida: Solo accesible si envías un JWT válido en los Headers
router.get('/perfil', verificarToken, authController.perfil)


module.exports = router;