const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');

router.get('/login', controller.getLogin); // 로그인 render
router.post('/login', controller.postLogin); // 로그인 성공여부
router.get('/logout', controller.getLogout); // 로그아웃

router.get('/signup', controller.getSignup); // 회원가입 render
router.get('/exists/:userId', controller.checkId); // 회원가입 id 중복체크
router.post('/signup', controller.postSignup); // 회원가입 성공

router.get('/myPage/myProfileRender', controller.myProfileRender); // 마이페이지 -> 프로필 수정 페이지
router.get('/myPage/myreviewListRender', controller.myreviewListRender); // 마이페이지 -> review 렌더
router.get('/myPage/myFavoriteConListRender', controller.myFavoriteConListRender); // 마이페이지 -> 찜기능 렌더
router.get('/myPage/myRegisterConRender', controller.myRegisterConRender); // 마이페이지 -> 내가 등록한 행사 렌더
router.post('/updateProfile', controller.updateProfile); // 회원정보 update
router.delete('/manager/deleteUserself', controller.deleteUserself); // 회원탈퇴

router.get('/myPage/myreviewList', controller.getmyreviewList); // 마이페이지 <내가쓴리뷰목록> 조회
router.delete('/manager/deleteMyReview', controller.deleteMyReview); // 마이페이지 <내가쓴리뷰목록> 삭제
router.get('/myPage/myFavoriteList', controller.getmyFavoriteList); // 마이페이지 <찜한 행사 목록> 조회
router.delete('/manager/deleteMyFavorite', controller.deleteMyFavorite); // 마이페이지 <찜한 행사 목록> 삭제
router.get('/myPage/writeReview', controller.getwriteReview); // 마이페이지 <찜한 행사 목록> 에서 지난행사 리뷰 남기기

router.post('/manager', controller.postManager); // 관리자페이지 render

router.get('/manager/allUser', controller.getUser); // 관리자페이지 전체 유저 조회
router.delete('/manager/deleteUser', controller.deleteUser); /// 관리자 페이지 유저 삭제

router.post('/manager/makeManager', controller.makeManager); /// 관리자 페이지 매니저 권한 부여
router.post('/manager/revokeManager', controller.revokeManager); /// 관리자 페이지 매니저 권한 회수

router.get('/manager/allConference', controller.getAllConference); // 관리자 페이지 전체 컨퍼런스 목록 render
router.get('/manager/getConferenceRegister', controller.getConforenceRegister); // 관리자 페이지 승인할 컨퍼런스 목록들
router.get('/manager/conferenceHandler', controller.conferenceHandler); // 관리자 페이지 행사 관리 페이지 render

router.post('/manager/approveConference', controller.approveConference); // 컨퍼런스 승인
router.post('/manager/rejectConference', controller.rejectConference); // 컨퍼런스 거절
router.get('/manager/getSuccessRegister', controller.getSuccessRegister); // 승인한 컨퍼런스 리스트 가져오기
router.get('/manager/rejectedConferenceList', controller.rejectConferenceList); // 거절한 컨퍼런스 리스트 가져오기

module.exports = router;
