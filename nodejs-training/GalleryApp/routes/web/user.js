const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
    res.send('Login');
});

router.get('/', (req, res) => {
    console.log('Users');
    res.send('users');
});

router.get('/:id/', (req, res) => {
    res.send('user with id: ' + req.params.id);
});

router.post('/', (req, res) => {
    console.log('post User');
    res.redirect('/users');
});

module.exports = router;