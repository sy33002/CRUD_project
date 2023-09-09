const express = require('express');
const router = express.Router();
const controller = require('../controller/coninfoController');

router.get('/', controller.index); //기본 홈 화면 라우트
router.get('/event', controller.getConferenceList);
router.get('/event/write', controller.getConferenceWrite);
router.get('/event/:id', controller.getConferenceDetail);
module.exports = router;
