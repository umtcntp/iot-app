const jwt = require('jsonwebtoken');

const authorize = (roles) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token is required' });

        jwt.verify(token, 'secret_key', (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Invalid token' });

            if (!roles.includes(decoded.role)) return res.status(403).json({ message: 'Access denied' });

            req.user = decoded;
            next();
        });
    };
};

module.exports = { authorize };
