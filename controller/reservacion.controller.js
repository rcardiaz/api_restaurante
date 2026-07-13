const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 1. POST /api/reservaciones -> Crear reservación (ROL: CLIENTE)
const crearReservacion = async (req, res) => {
    try {
        // Añadimos 'comensales' que es obligatorio en los requerimientos
        const { fecha, mesaId, comensales } = req.body;
        const usuarioId = req.user.id; 

        if (!fecha || !mesaId || !comensales) {
            return res.status(400).json({ error: "Todos los campos son requeridos (fecha, mesaId, comensales)." });
        }

        // VALIDACIÓN 1: Verificar que la mesa exista y esté activa (activo: true)
        const mesaExiste = await prisma.mesa.findFirst({
            where: { 
                id: Number(mesaId),
                activo: disponible // 'disponible: true' según el nombre exacto de tu columna
            }
        });

        if (!mesaExiste) {
            return res.status(404).json({ error: "La mesa seleccionada no existe." });
        }

        // VALIDACIÓN 2: Evitar doble reservación (Misma mesa, misma fecha)
        const existeColision = await prisma.reservacion.findFirst({
            where: {
                mesaId: Number(mesaId),
                fecha: new Date(fecha),
                estado: { not: 'CANCELADA' } 
            }
        });

        if (existeColision) {
            return res.status(400).json({ error: "Esta mesa ya se encuentra reservada para la fecha y hora seleccionada." });
        }

        // REGISTRO
        const nuevaReservacion = await prisma.reservacion.create({
            data: {
                fecha: new Date(fecha),
                mesaId: Number(mesaId),
                usuarioId: Number(usuarioId),
                comensales: Number(comensales),
                estado: 'PENDIENTE' 
            }
        });

        return res.status(201).json({ message: "Reservación creada con éxito", data: nuevaReservacion });

    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor al procesar la reservación", detalle: error.message });
    }
};

// 2. GET /api/reservaciones/mis -> Mis reservaciones (ROL: CLIENTE)
const obtenerMisReservaciones = async (req, res) => {
    try {
        const usuarioId = req.user.id; // Extraído de la sesión/token

        // Filtra estrictamente por el usuario actual
        const misReservas = await prisma.reservacion.findMany({
            where: { usuarioId: Number(usuarioId) },
            include: { mesa: true } // Trae la info de la mesa de forma interactiva
        });

        res.status(200).json(misReservas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener tus reservaciones" });
    }
};

// 3. GET /api/reservaciones -> Todas las reservaciones con filtros (ROL: ADMIN)
const obtenerTodasReservaciones = async (req, res) => {
    try {
        // El administrador ve todo el panorama y los datos de quién reservó
        const todasReservas = await prisma.reservacion.findMany({
            include: {
                mesa: true,
                usuario: {
                    select: { id: true, nombre: true, correo: true, rol: true }
                }
            }
        });

        res.status(200).json(todasReservas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el listado global de reservaciones" });
    }
};

// 4. PUT /api/reservaciones/:id/estado -> Cambiar estado de reservación (ROL: ADMIN)
const cambiarEstadoReservacion = async (req, res) => {
    try {
        const idReserva = Number(req.params.id);
        const { estado } = req.body; // Ej: 'CONFIRMADA', 'COMPLETADA', 'CANCELADA'

        if (!estado) {
            return res.status(400).json({ error: "El nuevo estado es requerido." });
        }

        const reserva = await prisma.reservacion.findUnique({ where: { id: idReserva } });
        if (!reserva) {
            return res.status(404).json({ error: "Reservación no encontrada." });
        }

        const reservaActualizada = await prisma.reservacion.update({
            where: { id: idReserva },
            data: { estado: estado.toUpperCase() } // Lo estandarizamos a mayúsculas
        });

        res.status(200).json({ message: "Estado de la reservación actualizado con éxito", data: reservaActualizada });
    } catch (error) {
        res.status(500).json({ error: "Error al cambiar el estado de la reservación" });
    }
};

// 5. DELETE /api/reservaciones/:id -> Cancelar propia reservación (ROL: CLIENTE)
const cancelarPropiaReservacion = async (req, res) => {
    try {
        const idReserva = Number(req.params.id);
        const usuarioId = req.user.id;

        const reserva = await prisma.reservacion.findUnique({ where: { id: idReserva } });
        if (!reserva) {
            return res.status(404).json({ error: "Reservación no encontrada." });
        }

        // SEGURIDAD: Validamos que la reserva pertenezca al cliente que la quiere cancelar
        if (reserva.usuarioId !== usuarioId) {
            return res.status(403).json({ error: "No tienes autorización para cancelar una reservación ajena." });
        }

        // SOFT DELETE: Cambiamos el estado a CANCELADA en lugar de destruirla físicamente
        const reservaCancelada = await prisma.reservacion.update({
            where: { id: idReserva },
            data: { estado: 'CANCELADA' }
        });

        res.status(200).json({ message: "Tu reservación ha sido cancelada exitosamente", data: reservaCancelada });
    } catch (error) {
        res.status(500).json({ error: "Error al intentar cancelar la reservación" });
    }
};

module.exports = {
    crearReservacion,
    obtenerMisReservaciones,
    obtenerTodasReservaciones,
    cambiarEstadoReservacion,
    cancelarPropiaReservacion
};