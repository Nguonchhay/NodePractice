const express = require('express');
const { 
    loginView,
    postLogin,
    registerView 
} = require('./../../controller/userController');

const router = express.Router();

router.get('/login', loginView);
router.post('/login', postLogin);

router.get('/register', registerView);

router.get('/', (req, res) => {
    console.log('Users');
    res.send('users');
});

router.get('/:id/', (req, res) => {
    res.send('user with id: ' + req.params.id);
});



module.exports = router;