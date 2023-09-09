const express = require('express');
const router = express.Router();
const controller = require('../controller/userController');

router.get('/login', controller.getLogin); // 로그인 render
router.post('/login', controller.postLogin); // 로그인 성공여부
router.post('/logout', controller.postLogout); // 로그아웃

router.get('/signup', controller.getSignup); // 회원가입 render
router.get('/exits/:id', controller.checkId); // 회원가입 id 중복체크
router.post('/signup', controller.postSignup); // 회원가입 성공

// router.patch('/myPage', controller.patchProfile);
// router.delete('/destroy', controller.deleteUser);

module.exports = router;
