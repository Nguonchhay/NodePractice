const express = require('express');
const { homeView, contactView } = require('./../../controller/pageContorller');

const router = express.Router();

router.get('/', homeView);
router.get('/contact', contactView);

module.exports = router;