const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extrae el token del formato "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ ok: false, mensaje: "Acceso denegado. No se proporcionó un token." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Inyecta los datos del usuario (id, rol, etc.) en la petición
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ ok: false, mensaje: "El token ha expirado. Por favor, inicia sesión nuevamente." });
        }
        return res.status(403).json({ ok: false, mensaje: "Token inválido o alterado." });
    }
};

// Middleware para restringir por rol (Admin / Cliente)
const requireRole = (rolePermitido) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== rolePermitido) {
            return res.status(403).json({ 
                ok: false, 
                mensaje: `Acceso prohibido. Se requieren permisos de ${rolePermitido}.` 
            });
        }
        next();
    };
};

module.exports = { verificarToken, requireRole };