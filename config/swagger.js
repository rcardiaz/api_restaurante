const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Reservaciones - Restaurante',
      version: '1.0.0',
      description: 'Documentación centralizada de la API para la gestión de mesas y reservaciones con roles.',
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
    paths: {
      "/api/auth/register": {
        "post": {
          "summary": "Registrar un nuevo cliente",
          "tags": ["Autenticación"],
          "responses": { "201": { "description": "Usuario creado" } }
        }
      },
      "/api/auth/login": {
        "post": {
          "summary": "Iniciar sesión (Obtener JWT)",
          "tags": ["Autenticación"],
          "responses": { "200": { "description": "Token generado" } }
        }
      },
      "/api/mesas": {
        "get": {
          "summary": "Obtener todas las mesas disponibles",
          "tags": ["Mesas"],
          "responses": { "200": { "description": "Lista de mesas" } }
        },
        "post": {
          "summary": "Crear una nueva mesa (Admin)",
          "tags": ["Mesas"],
          "security": [{ "bearerAuth": [] }],
          "responses": { "201": { "description": "Mesa creada" } }
        }
      },
      "/api/reservaciones": {
        "post": {
          "summary": "Crear una reservación (Cliente)",
          "tags": ["Reservaciones"],
          "security": [{ "bearerAuth": [] }],
          "responses": { "201": { "description": "Reservación exitosa" } }
        },
        "get": {
          "summary": "Ver todas las reservaciones (Admin)",
          "tags": ["Reservaciones"],
          "security": [{ "bearerAuth": [] }],
          "responses": { "200": { "description": "Listado completo" } }
        }
      },
      "/api/reservaciones/mis": {
        "get": {
          "summary": "Ver mis propias reservaciones (Cliente)",
          "tags": ["Reservaciones"],
          "security": [{ "bearerAuth": [] }],
          "responses": { "200": { "description": "Historial del cliente" } }
        }
      }
    }
  },
  apis: [], // Evita que busque comentarios rotos en otros archivos
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;