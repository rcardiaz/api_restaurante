# 🍽️ API REST — Sistema de Reservaciones de Restaurante

![Backend](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![ORM](https://img.shields.io/badge/ORM-Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Seguridad](https://img.shields.io/badge/Seguridad-JWT%20%26%20Bcrypt-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)
![Documentación](https://img.shields.io/badge/Docs-Swagger%20UI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

> 🚀 Solución Backend profesional para la gestión digital de mesas y reservaciones en línea en base a roles y permisos (Administrador / Cliente).

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

1️⃣ **Clonar el repositorio:**
```bash
git clone [https://github.com/rcardiaz/api_restaurante.git](https://github.com/rcardiaz/api_restaurante.git)
cd api_restaurante