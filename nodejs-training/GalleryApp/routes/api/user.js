const express = require('express');
const {
    login,
    register,
    show
} = require('./../../controller/api/userController');

const { authApiMiddleware } = require('./../../middlewares/auth');

const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
//router.get('/v1/me', authApiMiddleware, show);

const passport = require('passport');
router.get('/v1/me', passport.authenticate('jwt', { session: false }), show);

module.exports = router;