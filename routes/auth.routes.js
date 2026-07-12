const express = require('express')
const router = express.Router()
const authController = require('../controller/auth.controller')
const { verificarToken } = require('../Middlewares/auth.middleware')

//const { registro, login } = require('../controller/auth.controller')

//router.post('/register', registro) // /api/v1/auth/register
//router.post('/login', login) // /api/v1/auth/login

// Rutas públicas
router.post('/register', authController.registro)
router.post('/login', authController.login)

// Ruta protegida: Solo accesible si envías un JWT válido en los Headers
router.get('/perfil', verificarToken, authController.perfil)


module.exports = router;