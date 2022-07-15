const express = require('express');
const {
    login,
    register,
    show
} = require('./../../controller/api/userController');

const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/v1/me', show);

module.exports = router;