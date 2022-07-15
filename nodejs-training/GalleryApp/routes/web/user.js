const express = require('express');
const { 
    loginView,
    postLogin,
    registerView,
    usersView,
    usersPgView
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

module.exports = router;