const express = require('express');

const router = express.Router();

router.get('/v1/users', (req, res) => {
    res.json({
        'message': 'User list'
    });
});

module.exports = router;