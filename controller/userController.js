const { User, Sequelize } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

// login 페이지 렌더
exports.getLogin = (req, res) => {
    const data = req.session.userInfo;
    res.render('login');
};

// signup 페이지 렌더
exports.getSignup = (req, res) => {
    res.render('signup');
};

// 로그인
exports.postLogin = async (req, res) => {
    const { userId, userPw } = req.body;
    try {
        const result = await User.findOne({
            where: { user_id: userId },
        });
        if (result != null) {
            if (compareFunc(userPw, result.user_pw) === true) {
                req.session.userInfo = {
                    id: result.dataValues.id,
                    userName: result.dataValues.user_name,
                    userId: result.dataValues.user_id,
                    userPw: result.dataValues.user_pw,
                    userAddr: result.dataValues.user_addr,
                    userEmail: result.dataValues.user_email,
                    userCategory: result.dataValues.user_category,
                };
                const data = req.session.userInfo;
                res.send({ result: true, data });
            } else {
                res.send({ result: false, message: '비밀번호가 틀렸습니다.' });
            }
        } else {
            res.send({ result: false, message: '존재하는 사용자가 없습니다.' });
        }
    } catch (error) {
        console.error('로그인 시 DB 조회 오류:', error);
        res.status(500).send({
            result: false,
            message: '서버 오류가 발생했습니다.',
        });
    }
};

// 로그 아웃
exports.postLogout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return;
        }
        res.redirect('/');
    });
};

//회원가입 id 중복체크
exports.checkId = async (req, res) => {
    const { id } = req.params;
    const result = await User.findOne({
        where: { user_id: id },
    });
    if (result != null) {
        res.send({ result: true, message: '이미 존재하는 아이디 입니다!' });
    } else {
        res.send({ result: false, message: '사용 가능한 아이디입니다!' });
    }
};

//회원가입
exports.postSignup = async (req, res) => {
    try {
        const { userId, userPw, userName, userAddr, userEmail, userCategory } =
            req.body;
        pw = bcryptPassword(userPw);
        const result = await User.create({
            user_id: userId,
            user_pw: userPw,
            user_name: userName,
            user_addr: userAddr,
            user_email: userEmail,
            user_category: userCategory,
        });
        console.log('result = ', result);
        res.send({ result, message: `${result.dataValues.user_id}님! CRUD에 오신 것을 환영합니다.` });
    } catch (error) {
        console.error('회원가입 시 오류:', error);
        res.status(500).send({
            result: false,
            message: '오류가 발생했습니다.',
        });
    }
};

// 비밀번호 암호화 함수
const saltRounds = 5;
function bcryptPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
}

function compareFunc(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}

// 회원 탈퇴
// exports.patchProfile = async (req, res) => {
//   const result = await User.update({
//     user_id: req.body.user_id,
//     user_pw: req.body.user_pw,
//     user_name: req.body.user_name,
//     user_addr: req.body.user_addr,
//     user_email: req.body.user_email,
//     user_category: req.body.user_category,
//   }, {
//     where: {user_id: req.body.user_id}
//   });
//   res.send({result: true})
// };

// exports.deleteUser = async (req, res) => {
//   const result = await User.destroy({
//     where: { userid: req.session.userInfo.user_id },
//   });
//   req.session.destroy((err) =>{
//     if (err) {
//       return ;
//     }
//     res.send({result});
//   })
// };
