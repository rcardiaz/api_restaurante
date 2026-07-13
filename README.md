<div align="center">

# 🍽️ API REST — Sistema de Reservaciones de Restaurante

![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![ORM](https://img.shields.io/badge/ORM-Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Seguridad](https://img.shields.io/badge/Seguridad-JWT%20%26%20Bcrypt-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![Documentación](https://img.shields.io/badge/Docs-Swagger%20UI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

> 🚀 Solución Backend profesional para la gestión digital de mesas y reservaciones en línea en base a roles y permisos (Administrador / Cliente).

</div>

---

## 📌 Descripción de la Actividad
Este sistema permite a los clientes registrarse, iniciar sesión y realizar reservaciones de mesas eligiendo fecha, hora y comensales. Cuenta con un sistema inteligente anti-colisiones que valida la disponibilidad de la mesa en tiempo real antes de confirmar el registro. Además, proporciona herramientas exclusivas para administradores, tales como la gestión del catálogo de mesas (con Soft Delete implementado) y el control global de los estados de reservación.

---

## ⚙️ Requisitos Previos
Antes de iniciar, asegúrate de tener instalado en tu equipo:
- [Node.js](https://nodejs.org/) (Versión v16 o superior)
- [MySQL](https://www.mysql.com/) o el gestor de Base de Datos relacional compatible provisto en la práctica.
- Git para el control de versiones.

---

## 🚀 Instrucciones de Instalación

1️⃣ **Clonar el repositorio público:**
```bash
git clone [https://github.com/TU-USUARIO/api_restaurante.git](https://github.com/TU-USUARIO/api_restaurante.git)
cd api_restaurante

2️⃣ Instalar las dependencias de Node: npm install

3️⃣ Configurar las Variables de Entorno:
Crea un archivo .env en la raíz del proyecto basándote en el archivo .env.example: cp .env.example .env
Abre el archivo .env recién creado y rellena tus credenciales de base de datos y la firma del JWT.

4️⃣ Sincronizar la Base de Datos con Prisma:
Asegúrate de haber importado previamente el archivo .sql provisto en tu gestor, luego ejecuta en tu consola: 
npx prisma db pull
npx prisma generate

5️⃣ Iniciar el Servidor en Desarrollo: npm run dev 
El servidor se levantará de forma automática en: http://localhost:3000

🔑 Configuración del archivo .env.example
El proyecto requiere las siguientes variables de entorno para funcionar de manera correcta y segura:
PORT: Puerto en el que correrá el servidor local (Por defecto: 3000).
DATABASE_URL: Cadena de conexión de Prisma hacia MySQL. Ejemplo: mysql://usuario:password@localhost:3306/api_restaurante
JWT_SECRET: Clave secreta y robusta utilizada para firmar y verificar los tokens de sesión de los usuarios.

📄 Documentación Interactiva (Swagger UI)
La documentación completa de los parámetros de entrada (Request Body), respuestas estructuradas (200 OK, 201 Created) y manejo de errores específicos (401 Unauthorized, 403 Forbidden) está disponible tanto en entorno local como en producción en la siguiente ruta:

👉 http://localhost:3000/api-docs

Nota: Para probar los endpoints protegidos directamente en la interfaz de Swagger, genera un token mediante el endpoint /api/auth/login, haz clic en el botón "Authorize" en la esquina superior derecha de Swagger UI y pega tu token obtenido.

📂 Colección de Postman
Se ha incluido una colección completa con todas las peticiones listas para ser importadas y ejecutadas desde Postman.

Ubicación del archivo: Puedes encontrar el archivo JSON dentro de la carpeta raíz del proyecto con el nombre: API_Restaurante_Coleccion.postman_collection.json.

📋 Endpoints Principales de la API
Autenticación (/api/auth)
POST /api/auth/register — Registro de nuevos usuarios (Clientes). (Acceso: Público)
POST /api/auth/login — Login de usuarios. Devuelve un JWT firmado. (Acceso: Público)
GET /api/auth/perfil — Retorna los datos seguros del usuario autenticado en sesión. (Acceso: Cliente)

---Mesas (/api/mesas)
GET /api/mesas — Listar todas las mesas activas y disponibles filtando el soft delete. (Acceso: Público)
GET /api/mesas/:id — Detalle específico de una mesa. (Acceso: Público)
POST /api/mesas — Crear una nueva mesa dentro del catálogo. (Acceso: Solo Admin)
PUT /api/mesas/:id — Actualizar datos de una mesa existente. (Acceso: Solo Admin)
DELETE /api/mesas/:id — Desactivación lógica de una mesa (Soft Delete). (Acceso: Solo Admin)

---Reservaciones (/api/reservaciones)
POST /api/reservaciones — Crear una reservación validando cruce de horarios en tiempo real. (Acceso: Cliente)
GET /api/reservaciones/mis — Ver historial de las reservaciones propias del usuario actual. (Acceso: Cliente)
GET /api/reservaciones — Ver listado global de reservaciones con filtros de administración. (Acceso: Solo Admin)
PUT /api/reservaciones/:id/estado — Modificar el estado del flujo de un servicio (CONFIRMADA/CANCELADA). (Acceso: Solo Admin)
DELETE /api/reservaciones/:id — Cancelar una reservación propia cambiando su estado a inactivo. (Acceso: Cliente)