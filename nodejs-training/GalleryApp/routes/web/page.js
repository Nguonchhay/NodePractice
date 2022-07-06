const express = require('express');
const { homeView } = require('./../../controller/pageContorller');

const router = express.Router();

router.get('/', homeView);

module.exports = router;