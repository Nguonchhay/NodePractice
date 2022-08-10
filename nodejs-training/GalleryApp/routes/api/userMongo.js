const express = require('express');
const jwt = require('jsonwebtoken');
const {
    login,
    register,
    show
} = require('./../../controller/api/userMongoController');

const router = express.Router();

router.post('/mongo/register', register);
router.post('/mongo/login', login);
router.get('/mongo/me', (req, res, next) => {
    const authorization = req.body.token || req.query.token || req.headers.authorization;

    if (!authorization) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const tokens = authorization.split(' ');
        const decoded = jwt.verify(tokens[1].trim(), 'secretkey');
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    
    return next();
}, show);

module.exports = router;