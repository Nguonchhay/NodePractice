const jwt = require('jsonwebtoken');


const authApiMiddleware = (req, res, next) => {
    const authorization = req.body.token || req.query.token || req.headers.authorization;

    if (!authorization) {
        return res.status(403).json({
            message: 'A token is required for authentication'
        });
    }
    try {
        const tokens = authorization.split(' ');
        jwt.verify(tokens[1].trim(), 'secretkey', (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Token is expired'
                });
            }
            req.user = decoded;
            next();
        });
    } catch (err) {
        req.user = undefined;
        console.log(err);
        return res.status(401).json({
            message: 'Invalid Token' 
        });
    }
}

module.exports = {
    authApiMiddleware
}