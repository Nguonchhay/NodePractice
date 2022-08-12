const express = require('express');
const {
    login,
    register,
    show,
    changePassword,
    logout
} = require('./../../controller/api/userMongoController');
const { authApiMiddleware } = require('./../../middlewares/auth');

const router = express.Router();

router.post('/mongo/register', register);
router.post('/mongo/login', login);
router.get('/mongo/me', authApiMiddleware, show);
router.put('/mongo/update-password', authApiMiddleware, changePassword);
router.post('/mongo/logout', authApiMiddleware, logout);

module.exports = router;