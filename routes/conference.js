const express = require('express');
const cookieParser = require('cookie-parser');

const router = express.Router();
const controller = require('../controller/coninfoController');

router.get('/event', controller.getConferenceList); // event/list 페이지 렌더 역할 데이터 전송 x

router.post('/event', controller.postConferenceList); // 필터 기능
router.get('/event/list', controller.getConferenceInfo); //여기에서 send로 데이터 보내줨

router.get('/event/write', controller.getConferenceWrite);

router.get('/event/:id', controller.getConferenceDetail);

router.post('/event/write', controller.postConference);

router.post('/event/:id', controller.postConferenceEdit);

//관리자페이지에서 행사 등록 요청 보낸 것들
router.post(
    '/manager/getConferenceRegister',
    controller.postDisagreeConferenceList
);
module.exports = router;
// 재민님 일단 제가 DB에 컬럼 만들게요~
