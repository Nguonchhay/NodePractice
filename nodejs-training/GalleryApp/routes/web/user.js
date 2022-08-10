const express = require('express');
const { 
    loginView,
    postLogin,
    registerView,
    usersView,
    usersPgView,
    loginGoogle,
    loginGoogleCallback
} = require('./../../controller/userController');

const router = express.Router();

router.get('/login', loginView);
router.post('/login', postLogin);

router.get('/register', registerView);

router.get('/', usersView);
router.get('/pg', usersPgView);

router.get('/:id/', (req, res) => {
    res.send('user with id: ' + req.params.id);
});

router.get('/google/login', loginGoogle);
router.get('/google/callback', loginGoogleCallback);

module.exports = router;