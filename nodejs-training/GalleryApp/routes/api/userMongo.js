const express = require('express');
const {
    login,
    register,
    show,
    changePassword,
    logout
} = require('./../../controller/api/userMongoController');
const { authMongoMiddleware } = require('./../../middlewares/auth');

const router = express.Router();

router.post('/mongo/register', register);
router.post('/mongo/login', login);
router.get('/mongo/me', authMongoMiddleware, show);
router.put('/mongo/update-password', authMongoMiddleware, changePassword);
router.post('/mongo/logout', authMongoMiddleware, logout);

module.exports = router;