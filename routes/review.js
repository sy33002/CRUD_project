const express = require('express');
const router = express.Router();
const controller = require('../controller/reviewController');

router.get('/review', controller.getReview);
router.get('/review/write', controller.getReviewWrite);

module.exports = router;
