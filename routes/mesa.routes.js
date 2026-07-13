const express = require('express');
const router = express.Router();
const mesaController = require('../controller/mesa.controller');
const { verificarToken, requireRole } = require('../Middlewares/auth.middleware');

// Rutas Públicas
router.get('/', mesaController.obtenerMesas);
router.get('/:id', mesaController.obtenerMesaById);

// Rutas Privadas (Solo Administradores)
router.post('/', verificarToken, requireRole(['admin']), mesaController.crearMesa);
router.put('/:id', verificarToken, requireRole(['admin']), mesaController.actualizarMesa);
router.delete('/:id', verificarToken, requireRole(['admin']), mesaController.desactivarMesa);

module.exports = router;