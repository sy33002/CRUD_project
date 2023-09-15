const express = require('express');
const router = express.Router();
const controller = require('../controller/reviewController');
const uploadDetail = require('../utils');

router.get('/review', controller.getReview); // 리뷰 페이지
router.post('/review', controller.postReview); // 리뷰 작성 요청

// 동작 확인 위해서 get으로 하였음
router.get('/review/delete', controller.deleteReview); // 리뷰 삭제 요청

router.get('/review/write', controller.getReviewWrite); // 리뷰 작성 페이지

router.get('/review/:id', controller.getReviewDetail); // 리뷰 상세 페이지

module.exports = router;
