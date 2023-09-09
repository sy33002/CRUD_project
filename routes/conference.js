const express = require('express');
const cookieParser = require('cookie-parser');

const router = express.Router();
const controller = require('../controller/coninfoController');

router.get('/', controller.getConferenceList);
router.get('/write', controller.getConferenceWrite);
router.get('/:id', controller.getConferenceDetail);
router.post('/write', controller.postConference);
router.put('/:id', controller.putConferenceCntUp); //컨퍼런스 조회수 증가

module.exports = router;
