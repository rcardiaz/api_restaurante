const express = require('express');
const router = express.Router();
const mesaController = require('../controller/mesa.controller');
const { verificarToken, requireRole } = require('../Middlewares/auth.middleware');

/**
 * @swagger
 * /api/mesas:
 * get:
 * summary: Obtener todas las mesas activas
 * tags: [Mesas]
 * responses:
 * 200:
 * description: Lista de mesas disponibles.
 * post:
 * summary: Crear una nueva mesa (Solo Admin)
 * tags: [Mesas]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - numero
 * - capacidad
 * properties:
 * numero:
 * type: integer
 * example: 5
 * capacidad:
 * type: integer
 * example: 4
 * responses:
 * 201:
 * description: Mesa añadida al catálogo.
 */
router.get('/', mesaController.obtenerMesas);
router.post('/', verificarToken, requireRole(['admin']), mesaController.crearMesa);

/**
 * @swagger
 * /api/mesas/{id}:
 * delete:
 * summary: Desactivación lógica de una mesa / Soft Delete (Solo Admin)
 * tags: [Mesas]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID numérico de la mesa
 * responses:
 * 200:
 * description: Mesa desactivada lógicamente de forma correcta.
 */
router.delete('/:id', verificarToken, requireRole(['admin']), mesaController.eliminarMesa);

module.exports = router;