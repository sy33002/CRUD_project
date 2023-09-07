const express = require("express");
const router = express.Router();
const controller = require("../controller/coninfoController");

router.get("/", controller.index); //기본 홈 화면 라우트

router.get("/registerConference", controller.getRegisterConference); //홈 화면에서 눌렀을 때 컨퍼런스 등록 요청 폼 페이지로 이동하는 라우트
router.post("/registerConference", controller.postRegisterConference); //폼 화면에서 컨퍼런스 등록 폼 제출했을 때 라우트

router.get("/conference", controller.getConference); //홈 화면에서 컨퍼런스 상세정보로 넘어가는 라우트

module.exports = router;
