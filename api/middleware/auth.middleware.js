const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        req.userId = null;
        console.log('[Auth] Aucun token fourni');
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        console.log('[Auth] Token vérifié, userId:', req.userId);
        next();
    } catch (err) {
        req.userId = null;
        console.log('[Auth] Erreur vérification token:', err.message);
        next();
    }
};
