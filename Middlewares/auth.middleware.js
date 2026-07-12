const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'clave_secreta_por_defecto'

//1. Middleware para verificar que el usuario incio sesión(JWT valido)
const verificarToken = (req, res, next) => {
   
   //Captura el token desde los encabezados(Autorización: )
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extrae el token del formato "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ ok: false, mensaje: "Acceso denegado. No se proporcionó un token." });
    }

    try {
        //verificar el token con la firma secreta
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
               //ingresamos los datos del usuario descifrados dentro del objeto "req"
                req.user = decoded; // Inyecta los datos del usuario (id, rol, etc.) en la petición
        next();
    } catch (error) {
        //distingue de forma clara errores de expiración o alteración
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ ok: false, mensaje: "El token ha expirado. Por favor, inicia sesión nuevamente." });
        }
        return res.status(403).json({ ok: false, mensaje: "Token inválido o alterado." });
    }
};

// Middleware para restringir por rol (Admin / Cliente)

// 2. Middleware dinámico para control de Roles (requireRole)
const requireRole = (rolesPermitidos) => {
    return (req, res, next) => {
        // Validamos que 'verificarToken' ya haya inyectado al usuario en el req
        if (!req.user) {
            return res.status(401).json({ error: 'No autenticado.' })
        }

        // Comprobamos si el rol del usuario está dentro de la lista de roles autorizados
        if (!rolesPermitidos.includes(req.user.role || req.user.rol)) {
            return res.status(403).json({ 
                error: `Acceso prohibido. Esta acción es exclusiva para los roles: [${rolesPermitidos.join(', ')}]` 
            })
        }

        next() // Si tiene el rol adecuado, prosigue al controlador
    }
}

module.exports = { verificarToken, requireRole }
