const express = require('express');
const router = express.Router();
const reservacionController = require('../controller/reservacion.controller');
const { verificarToken, requireRole } = require('../Middlewares/auth.middleware');

/**
 * @swagger
 * /api/reservaciones:
 * post:
 * summary: Crear una nueva reservación (Cliente)
 * tags: [Reservaciones]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - mesaId
 * - fecha
 * - comensales
 * properties:
 * mesaId:
 * type: integer
 * example: 1
 * fecha:
 * type: string
 * format: date
 * example: "2026-07-20"
 * comensales:
 * type: integer
 * example: 4
 * responses:
 * 201:
 * description: Reservación creada con éxito.
 * 400:
 * description: Conflicto u horario no disponible para esa mesa.
 * get:
 * summary: Obtener el listado global de reservaciones (Solo Admin)
 * tags: [Reservaciones]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Lista global de reservaciones obtenida.
 */
router.post('/', verificarToken, requireRole(['cliente']), reservacionController.crearReservacion);
router.get('/', verificarToken, requireRole(['admin']), reservacionController.obtenerTodasReservaciones);

/**
 * @swagger
 * /api/reservaciones/mis:
 * get:
 * summary: Ver historial de reservaciones del cliente autenticado (Cliente)
 * tags: [Reservaciones]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Lista de reservaciones propias del usuario.
 */
router.get('/mis', verificarToken, requireRole(['cliente']), reservacionController.obtenerMisReservaciones);

/**
 * @swagger
 * /api/reservaciones/{id}/estado:
 * put:
 * summary: Modificar el estado de una reservación (Solo Admin)
 * tags: [Reservaciones]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID de la reservación
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - estado
 * properties:
 * estado:
 * type: string
 * enum: [PENDIENTE, CONFIRMADA, CANCELADA]
 * example: "CONFIRMADA"
 * responses:
 * 200:
 * description: Estado de la reservación actualizado correctamente.
 */
router.put('/:id/estado', verificarToken, requireRole(['admin']), reservacionController.actualizarEstado);

/**
 * @swagger
 * /api/reservaciones/{id}:
 * delete:
 * summary: Cancelar una reservación propia (Cliente)
 * tags: [Reservaciones]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: integer
 * description: ID de la reservación a cancelar
 * responses:
 * 200:
 * description: Reservación cancelada de manera exitosa.
 */
router.delete('/:id', verificarToken, requireRole(['cliente']), reservacionController.cancelarReservacion);

module.exports = router;