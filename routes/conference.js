const express = require('express');
const cookieParser = require('cookie-parser');
const uploadDetail = require('../utils');

const router = express.Router();
const controller = require('../controller/coninfoController');

router.get('/event', controller.getConferenceList);
router.get('/event/write', controller.getConferenceWrite);
router.get('/event/:id', controller.getConferenceDetail);
router.post('/event/write', controller.postConference);
router.put('/event/:id', controller.updateConferenceCnt); //컨퍼런스 조회수 증가

router.post(
    '/upload/:path',
    uploadDetail.single('conferenceFile'),
    (req, res) => {
        res.send({ result: true, file: req.file });
    }
);

module.exports = router;
// 재민님 일단 제가 DB에 컬럼 만들게요~
