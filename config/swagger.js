const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Reservaciones - Restaurante',
      version: '1.0.0',
      description: 'Documentación de la API para la gestión de mesas y reservaciones con autenticación JWT y roles.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Introduce tu token JWT en el formato: Bearer <token>',
        },
      },
    },
    // Agregamos las rutas de forma manual y limpia aquí para evitar los crashes de identación
    paths: {
      "/api/auth/register": {
        "post": {
          "summary": "Registrar un nuevo cliente",
          "tags": ["Autenticación"],
          "responses": { "201": { "description": "Usuario registrado exitosamente" } }
        }
      },
      "/api/auth/login": {
        "post": {
          "summary": "Iniciar sesión de usuario",
          "tags": ["Autenticación"],
          "responses": { "200": { "description": "Login exitoso" } }
        }
      },
      "/api/mesas": {
        "get": {
          "summary": "Listar mesas disponibles",
          "tags": ["Mesas"],
          "responses": { "200": { "description": "Lista de mesas" } }
        }
      }
    }
  },
  //  Ponemos un arreglo vacío aquí para que no intente escanear tus archivos de rutas y no colapse
  apis: [], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;