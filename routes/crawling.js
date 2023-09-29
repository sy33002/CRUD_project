const express = require('express');

const router = express.Router();
const controller = require('../controller/crawlingController');

router.get('/crawling', controller.getCrawling);

module.exports = router;
