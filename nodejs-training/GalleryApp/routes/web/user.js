const express = require('express');
const { loginView, registerView } = require('./../../controller/userController');

const router = express.Router();

router.get('/login', loginView);
router.post('/login', (req, res) => {
    console.log('post User');
    res.redirect('/users');
});

router.get('/register', registerView);

router.get('/', (req, res) => {
    console.log('Users');
    res.send('users');
});

router.get('/:id/', (req, res) => {
    res.send('user with id: ' + req.params.id);
});



module.exports = router;