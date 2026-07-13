const express = require('express');
const router = express.Router();
const reservacionController = require('../controller/reservacion.controller');
const { verificarToken, requireRole } = require('../Middlewares/auth.middleware');

// Aplicar verificación de token a todas las operaciones de reservación
router.use(verificarToken);

// Rutas de Cliente
router.post('/', requireRole(['cliente']), reservacionController.crearReservacion);
router.get('/mis', requireRole(['cliente']), reservacionController.obtenerMisReservaciones);
router.delete('/:id', requireRole(['cliente']), reservacionController.cancelarPropiaReservacion);

// Rutas de Administrador
router.get('/', requireRole(['admin']), reservacionController.obtenerTodasReservaciones);
router.put('/:id/estado', requireRole(['admin']), reservacionController.cambiarEstadoReservacion); // 🌟 Nombre corregido alineado con tu controlador

module.exports = router;