const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger.js'); // Importas tu configuración
const app = express();

// 1. Middlewares globales
app.use(express.json());

// Servir la documentación interactiva de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 2. Importación de las rutas
const authRoutes = require('./routes/auth.routes');
const mesasRoutes = require('./routes/mesa.routes');
const reservacionesRoutes = require('./routes/reservacion.routes'); 

// 3. Ruta de bienvenida (Raíz)
app.get('/', (req, res) => {
    res.json({
        mensaje: 'Bienvenidos a la API de Restaurante',
        descripcion: 'API que gestiona mesas y reservaciones en base al rol del usuario',
        version: '1.0.0',
    });
});

// 4. Declaración de las rutas de la API
app.use('/api/auth', authRoutes);
app.use('/api/mesas', mesasRoutes);
app.use('/api/reservaciones', reservacionesRoutes);

// 5. Encendido del servidor (SIEMPRE AL FINAL)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("==========================================================");
    console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`);
    console.log(`📄 Documentación disponible en: http://localhost:${PORT}/api-docs`);
    console.log("==========================================================");
});