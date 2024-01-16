
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require("../config");

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).send('Invalid token.');
        req.userId = decoded.id;
        next();
    });
};

module.exports = { authenticateJWT };
