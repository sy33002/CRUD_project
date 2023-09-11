const express = require('express');
const router = express.Router();
const controller = require('../controller/reviewController');
const uploadDetail = require('../utils');

router.get('/review', controller.getReview); // 리뷰 페이지
router.post('/review', controller.postReview); // 리뷰 작성 요청

// 동작 확인 위해서 get으로 하였음
router.get('/review/delete', controller.deleteReview); // 리뷰 삭제 요청

router.get('/review/write', controller.getReviewWrite); // 리뷰 작성 페이지
router.get('/review/write', controller.getReviewWrite); // 리뷰 사진 업로드
router.post('/upload', uploadDetail.single('userFile'), (req, res) => {
    console.log("req.body", req.body);    
    // const allowedPaths = ['review']; // 허용되는 경로 값
    // if (!allowedPaths.includes(req.body.path)) {
    //     return res.status(400).json({ error: '잘못된 경로 값' });
    // }
    req.body = req.body
});

module.exports = router;
