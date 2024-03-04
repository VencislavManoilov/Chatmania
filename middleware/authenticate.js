const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    // Get token from request header or cookies
    const token = req.header('Authorization').replace('Bearer ', '');

    // Verify token
    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' });
    }
}

module.exports = authenticate;