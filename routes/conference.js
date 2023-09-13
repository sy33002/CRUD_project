const express = require('express');
const cookieParser = require('cookie-parser');

const router = express.Router();
const controller = require('../controller/coninfoController');

router.get('/event', controller.getConferenceList);

router.get('/event/write', controller.getConferenceWrite);

router.get('/event/:id', controller.getConferenceDetail);

router.post('/event/write', controller.postConference);

router.post('/event/:id', controller.postConferenceEdit);


module.exports = router;
// 재민님 일단 제가 DB에 컬럼 만들게요~
