const express = require('express');
const passport = require('passport');
const ensureLogin = require('connect-ensure-login').ensureLoggedIn;

const { 
    loginView,
    postLogin,
    registerView,
    usersView,
    usersPgView,
    userDetail
} = require('./../../controller/userController');

const router = express.Router();
const ensureLoggedIn = ensureLogin('/users/login');

router.get('/login', loginView);
router.post('/login', postLogin);

router.get('/register', registerView);

router.get('/', usersView);
router.get('/pg', usersPgView);

router.get('/show', ensureLoggedIn, userDetail);

router.get('/google/login', passport.authenticate('google'));
router.get('/google/callback', passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/users/login'
}), userDetail);

module.exports = router;