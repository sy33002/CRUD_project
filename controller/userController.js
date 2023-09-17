const { User, Sequelize } = require('../models');
const { Conference } = require('../models');
const { ConFavorite } = require('../models');
const { ConferenceReview } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

// login 페이지 렌더
exports.getLogin = (req, res) => {
    res.render('login');
};

// signup 페이지 렌더
exports.getSignup = (req, res) => {
    res.render('signup');
};

// MyPage 렌더
exports.getProfile = async (req, res) => {
    const data = req.session.userInfo;
    if (data) {
        console.log("getProfile contoroller>>", data);
        res.render('myPage/profile', {data});
    } else {
        res.render('login');
    }
};

// 관리자 페이지 render
exports.getManager = async (req, res) => {
    res.render('myPage/manager');
};

// 관리자페이지 버튼
exports.postManager = async (req, res) => {
    const data = req.session.userInfo;
    if (data.userIsManager === 1) {
        res.send(true);
    } else {
        res.send(false);
    }
};

// 관리자 페이지에서 전체 유저 보기
exports.getUser = async (req, res) => {
    const users = await User.findAll();
    res.render('myPage/allUser', { users });
};

// 관리자 페이지에서 유저 삭제 하기
exports.deleteUser = async (req, res) => {
    console.log('req.body.user_id >>>>', req.body.user_id);
    const result = await User.destroy({
        where: { id: req.body.user_id },
    });
    console.log(result);
    if (result === 1) {
        res.send(true);
        return;
    } else {
        res.send(false);
    }
};

// 관리자 페이지에서 유저 매니저 권한 승인
exports.makeManager = async (req, res) => {
    try {
        const result = await User.update(
            {
                user_isManager: 1,
            },
            {
                where: { id: req.body.user_id },
            }
        );
        if (result > 0) {
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(false);
    }
};

// 관리자 페이지에서 유저 매니저 권한 회수
exports.revokeManager = async (req, res) => {
    try {
        const result = await User.update(
            {
                user_isManager: 0,
            },
            {
                where: { id: req.body.user_id },
            }
        );
        if (result > 0) {
            res.send(true);
        } else {
            res.send(false);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(false);
    }
};

// 관리자 페이지에서 전체 컨퍼런스 보기
exports.getAllConference = async (req, res) => {
    const conferences = await Conference.findAll();
    res.render('myPage/allConference', {conferences});
};

// 관리자 페이지 행사 관리 페이지 render
exports.getconferenceHandler = async (req, res) => {
    res.render('myPage/conferenceHandler');
};

// 관리자 페이지에서 승인해야할 conference 보기
exports.getConforenceRegister = async (req, res) => {
    try {
        const conferences = await Conference.findAll({
            where: { is_agreed: false },
        });
        res.send({ conferences });
    } catch (error) {
        console.error(error);
        res.status(500).send('Manager Conference Agree Error');
    }
};

// 행사 관리 페이지 render
exports.conferenceHandler = async (req, res) => {
    res.render('myPage/conferenceHandler');
};

// 관리자 페이지 conference 승인하기
exports.approveConference = async (req, res) => {
    try {
        const conferences = await Conference.update(
            {
                is_agreed: 1,
            },
            {
                where: { con_id: req.body.conferenceId },
            }
        );
        res.send({ conferences });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            error: 'Manager Conference Agree Error',
            message: error.message,
        });
    }
};

// 관리자 페이지 conference 거절하기
exports.rejectConference = async (req, res) => {
    try {
        const conferences = await Conference.update(
            {
                is_agreed: -1,
            },
            {
                where: { con_id: req.body.conferenceId },
            }
        );
        res.send({ conferences });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            error: 'Manager Conference Agree Error',
            message: error.message,
        });
    }
};

// 관리자 페이지에서 승인된 컨퍼런스 보기
exports.getSuccessRegister = async (req, res) => {
    try {
        const conferences = await Conference.findAll({
            where: { is_agreed: 1 },
        });
        res.send({ conferences });
    } catch (error) {
        console.error(error);
        res.status(500).send('Manager Conference Agree Error');
    }
};

// 관리자 페이지에서 거절된 컨퍼런스 보기
exports.getSuccessRegister = async (req, res) => {
    try {
        const conferences = await Conference.findAll({
            where: { is_agreed: 1 },
        });
        res.send({ conferences });
    } catch (error) {
        console.error(error);
        res.status(500).send('Manager Conference Agree Error');
    }
};

// 관리자 페이지에서 거절된 컨퍼런스 보기
exports.rejectConferenceList = async (req, res) => {
    try {
        const conferences = await Conference.findAll({
            where: { is_agreed: -1 },
        });
        res.send({ conferences });
    } catch (error) {
        console.error(error);
        res.status(500).send('Manager Conference Agree Error');
    }
};

// 로그인
exports.postLogin = async (req, res) => {
    const { userId, userPw } = req.body;
    try {
        const result = await User.findOne({
            where: { user_id: userId },
        });
        if (result != null) {
            if (compareFunc(userPw, result.dataValues.user_pw) === true) {
                req.session.userInfo = {
                    id: result.dataValues.id,
                    userName: result.dataValues.user_name,
                    userId: result.dataValues.user_id,
                    userPw: result.dataValues.user_pw,
                    userAddr: result.dataValues.user_addr,
                    userEmail: result.dataValues.user_email,
                    userCategory: result.dataValues.user_category,
                    userIsManager: result.dataValues.user_isManager,
                };
                const data = req.session.userInfo;
                res.send({ result: true, data });
            } else {
                res.send({ result: false, idCheck: true, pwCheck: false });
            }
        } else {
            res.send({ result: false, idCheck: false, pwCheck: false });
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
exports.getLogout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return;
        }
        res.redirect('/');
    });
};

//회원가입 id 중복체크
exports.checkId = async (req, res) => {
    const { userId } = req.params;
    const result = await User.findOne({
        where: { user_id: userId },
    });
    if (result != null) {
        res.send({ result: true });
    } else {
        res.send({ result: false });
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
            user_pw: pw,
            user_name: userName,
            user_addr: userAddr,
            user_email: userEmail,
            user_category: userCategory,
            user_isManager: 0,
        });
        res.send({
            result,
            message: `${result.dataValues.user_id}님! CRUD에 오신 것을 환영합니다.`,
        });
    } catch (error) {
        console.error('회원가입 시 오류:', error);
        res.status(500).send({
            result: false,
            message: '오류가 발생했습니다.',
        });
    }
};

// 마이페이지 -> 회원 정보 수정 페이지
exports.myProfileRender = async (req, res) => {
    const userId = req.query.userId;
    const userData = await User.findOne({
        where: { user_id: userId },
    });
    res.render('myPage/profileUpdate',{ data: userData.dataValues });
};

// 마이페이지 -> 마이 리뷰 페이지
exports.myreviewListRender = async (req, res) => {
    const userId = req.query.userId;
    const userData = await User.findOne({
        where: { user_id: userId },
    });
    res.render('myPage/myreviewList', { data:userData.dataValues });
};

// 마이페이지 -> 찜한 행사 페이지
exports.myFavoriteConListRender = async (req, res) => {
    const userId = req.query.userId;
    console.log("userId>>>>>", userId);
    const userData = await User.findOne({
        where: { id: userId },
    });
    console.log("userData>>>>>", userData);
    res.render('myPage/myFavoriteCon', { data:userData.dataValues });
};

// 회원정보 update
exports.updateProfile = async (req, res) => {
    const data = req.session.userInfo;
    let result;

    if (data.userPw === req.body.userPw) {
        // 프로필 수정에서 비번 변경 안했다면,
        result = await User.update(
            {
                user_name: req.body.userName,
                user_addr: req.body.userAddr,
                user_email: req.body.userEmail,
                user_category: req.body.userCategory,
            },
            {
                where: { user_id: req.body.userId },
            }
        );
    } else {
        // 프로필 수정에서 비번 변경 했다면,
        const pw = bcryptPassword(req.body.userPw);
        result = await User.update(
            {
                user_pw: pw,
                user_name: req.body.userName,
                user_addr: req.body.userAddr,
                user_email: req.body.userEmail,
                user_category: req.body.userCategory,
            },
            {
                where: { user_id: req.body.userId },
            }
        );
    }

    if (result > 0) {
        res.send({ result: true });
    } else {
        res.send({ result: false });
    }
};

// 회원 탈퇴
exports.deleteUserself = async (req, res) => {
    const result = await User.destroy({
        where: { user_id: req.body.user_id },
    });
    if (result === 1) {
        res.send(true);
        return;
    } else {
        res.send(false);
    }
};

// 내가 쓴 리뷰 목록 불러오기
exports.getmyreviewList = async (req, res) => {
    try {
        const reviews = await ConferenceReview.findAll({
            where: { user_id: req.query.userId },
        });

        const reviewPromises = reviews.map(async (review) => {
            const conId = review.con_id;
            const relatedConference = await Conference.findOne({
                where: { con_id: conId }
            });
            return {
                review,
                relatedConference
            };
        });
        const results = await Promise.all(reviewPromises);
        res.send({ results });
    } catch (error) {
        console.error(error);
        res.status(500).send('get myreviewList Error');
    }
};

// 내가 쓴 리뷰 삭제
exports.deleteMyReview = async (req, res) => {
    const result = await ConferenceReview.destroy({
        where: { re_id: req.body.re_id },
    });
    if (result === 1) {
        res.send(true);
        return;
    } else {
        res.send(false);
    }
};

// 내가 찜한 행사 목록 불러오기
exports.getmyFavoriteList = async (req, res) => {
    console.log("getmyFavoriteList>>>", req.query);
    try {
        const favorites = await ConFavorite.findAll({
            where: { user_id: req.query.userId },
        });
        const getFavorites = await Promise.all(
            favorites.map(async (favorite) => {
                const conference = await Conference.findOne({
                    where: { con_id: favorite.con_id }
                });
                console.log("conference>>>", conference.dataValues);
                console.log("favorites.length>>>", favorites);
                return conference.dataValues;
            })
        );
        res.send({ getFavorites });
    } catch (error) {
        console.error(error);
        res.status(500).send('get myFavoriteList Error');
    }
};

// 찜한 항목 삭제
exports.deleteMyFavorite = async (req, res) => {
    const result = await ConFavorite.destroy({
        where: { con_id: req.body.con_id },
    });
    if (result === 1) {
        res.send(true);
        return;
    } else {
        res.send(false);
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
