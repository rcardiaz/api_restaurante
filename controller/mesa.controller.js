//Usamos la instancia limpia de Prisma heredada de tu configuración
const prisma = require('../prisma/client');


//const { PrismaClient } = require('@prisma/client');
//const prisma = new PrismaClient(); // <--- ¡ESTA LÍNEA ES LA QUE FALTA!

// controlador que sirve para las acciones de las mesas
// metodo para obtener todas las mesas
//funcion asincrona: funcion que se ejecuta en segundo plano
const obtenerMesas = async (req, res) => {
    try {
        // Filtramos para mostrar SOLO las mesas que NO tienen soft-delete
        const lista_mesas = await prisma.mesa.findMany({
            where: {
                disponible: true // Si pones 'activo' en tu schema, cámbialo por 'activo'
            }
        });
        res.status(200).json(lista_mesas);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las mesas" });
    }
}

//GET /api/mesas/:id
//funcion para obtener una mesa por su ID
const obtenerMesaById = async (req, res) => {
    try {
        const idMesa = Number(req.params.id);
        
        // Buscamos que exista y que además esté disponible
        const mesa = await prisma.mesa.findFirst({
            where: { 
                id: idMesa,
                disponible: true 
            },
        });

        if (!mesa) {
            return res.status(404).json({ error: "Mesa no encontrada o no disponible" });
        }

        res.status(200).json(mesa);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la mesa" });
    }
}

//POST/api/mesas
// funcion para crear una nueva mesa
const crearMesa = async (req, res) => {
    try {
        const { numero, capacidad } = req.body;

        // Validar campos mínimos
        if (!numero || !capacidad) {
            return res.status(400).json({ error: "Número y capacidad son requeridos" });
        }

        // Ejecutamos la creación usando la instancia global limpia
        const nuevaMesa = await prisma.mesa.create({
            data: {
                numero: Number(numero),
                capacidad: Number(capacidad),
                disponible: true // Toda mesa nueva nace activa
            },
        });

        res.status(201).json({
            message: "Mesa registrada correctamente",
            mesa: nuevaMesa
        });
    } catch (error) {
        res.status(500).json({ error: "Error al crear la mesa", detalle: error.message });
    }
}

// PUT /api/mesas/:id
// actualizar una mesa por ID
const actualizarMesa = async (req, res) => {
    const id = Number(req.params.id)

    const existe = await prisma.mesa.findUnique({ where: { id } })
    if (!existe) {
        return res.status(404).json({ error: 'Mesa no encontrada' })
    }

    // update mesas set numero = 12, capacidad = 10, disponible = true where id = 2
    const mesa = await prisma.mesa.update({
        where: { id },
        data: req.body //numero, capacidad, disponible
    })

    res.status(200).json({
        message: 'Mesa actualizada exitosamente',
        mesa
    })
}

// metodo que desactiva una mesa
const desactivarMesa = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const existe = await prisma.mesa.findUnique({ where: { id } });
        if (!existe) {
            return res.status(404).json({ error: 'Mesa no encontrada' });
        }

        //Hacemos Update en lugar de Delete físico
        await prisma.mesa.update({
            where: { id },
            data: { disponible: false }
        });

        res.status(200).json({ message: 'Mesa desactivada con éxito (Soft Delete)' });
    } catch (error) {
        res.status(500).json({ error: "Error al desactivar la mesa" });
    }
}

// exportando los metodos para ocuparlos en cualquier lugar
module.exports = {
    obtenerMesas,
    obtenerMesaById,
    crearMesa,
    actualizarMesa,
    desactivarMesa
}