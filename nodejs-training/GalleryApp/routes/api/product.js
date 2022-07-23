const express = require('express');
const {
    list,
    show
} = require('./../../controller/api/productController');

const router = express.Router();

router.get('/products', list);
router.get('/products/:id/show', show)

module.exports = router