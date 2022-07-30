const express = require('express');
const {
    list,
    rawList
} = require('./../../controller/api/saleController');

const router = express.Router();

router.get('/sales', list);
router.get('/sales/raw', rawList)

module.exports = router