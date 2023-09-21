const { User, Sequelize } = require('../models');
const { Conference } = require('../models');
const { ConFavorite } = require('../models');
const { ConferenceReview } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
// login 페이지 렌더
exports.getLogin = (req, res) => {
    res.render('login');
};

// signup 페이지 렌더
exports.getSignup = (req, res) => {
    res.render('signup');
};

// 관리자 페이지: 전체 유저 보기
exports.getUser = async (req, res) => {
    if (req.session.userInfo) {
        const data = req.session.userInfo;
        if (data.userIsManager === true) {
            const users = await User.findAll();
            res.render('myPage/allUser', { users });
        } else {
            res.render('404');
        }
    } else {
        res.render('404');
    }
};

// 관리자 페이지: 유저 삭제 하기
exports.deleteUser = async (req, res) => {
    const result = await User.destroy({
        where: { id: req.body.user_id },
    });
    if (result === 1) {
        res.send(true);
        return;
    } else {
        res.send(false);
    }
};

// 관리자 페이지: 유저 매니저 권한 승인
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

// 관리자 페이지: 유저 매니저 권한 회수
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

// 관리자 페이지: 전체 컨퍼런스 보기
exports.getAllConference = async (req, res) => {
    if (req.session.userInfo) {
        const data = req.session.userInfo;
        if (data.userIsManager === true) {
            const conferences = await Conference.findAll();
            res.render('myPage/allConference', { conferences });
        } else {
            res.render('404');
        }
    } else {
        res.render('404');
    }
};

// 관리자 페이지: 컨퍼런스 삭제하기
exports.deleteConference = async (req, res) => {
    const result = await Conference.destroy({
        where: { con_id: req.body.con_id },
    });
    if (result === 1) {
        res.send(true);
        return;
    } else {
        res.send(false);
    }
};

// 관리자 페이지: 행사 관리 페이지 render
exports.getconferenceHandler = async (req, res) => {
    if (req.session.userInfo) {
        const data = req.session.userInfo;
        if (data.userIsManager === true) {
            res.render('myPage/conferenceHandler');
        } else {
            res.render('404');
        }
    } else {
        res.render('404');
    }
};

// 관리자 페이지: 승인해야할 conference 보기
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

// 관리자 페이지: 행사 관리 페이지 render
exports.conferenceHandler = async (req, res) => {
    if (req.session.userInfo) {
        const data = req.session.userInfo;
        if (data.userIsManager === true) {
            res.render('myPage/conferenceHandler');
        } else {
            res.render('404');
        }
    } else {
        res.render('404');
    }
};

// 관리자 페이지: conference 승인하기
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

// 관리자 페이지: conference 거절하기
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

// 관리자 페이지: 승인된 컨퍼런스 보기
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

// 관리자 페이지: 승인된 컨퍼런스 보기
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

// 관리자 페이지: 거절된 컨퍼런스 보기
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
                console.log('>>>>>', req.cookies.redirectURL);

                if (req.cookies.redirectURL === undefined) {
                    return res.send({ result: true, data });
                } else {
                    res.clearCookie('redirectURL');
                    return res.send({
                        result: true,
                        data,
                        redirectURL: req.cookies.redirectURL,
                    });
                }
            } else {
                return res.send({
                    result: false,
                    idCheck: true,
                    pwCheck: false,
                });
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
    const data = req.session.userInfo;
    if (data) {
        const userId = data.id;
        const userData = await User.findOne({
            where: { id: userId },
        });
        res.render('myPage/profileUpdate', { data: userData.dataValues });
    } else {
        res.render('login');
    }
};

// 마이페이지 -> 마이 리뷰 페이지
exports.myreviewListRender = async (req, res) => {
    const userId = req.query.userId;
    const data = req.session.userInfo;
    if (data) {
        if (data.id == userId) {
            const userData = await User.findOne({
                where: { id: userId },
            });
            res.render('myPage/myreviewList', { data: userData.dataValues });
        } else {
            res.render('404');
        }
    } else {
        res.render('login');
    }
};

// 마이페이지 -> 찜한 행사 페이지
exports.myFavoriteConListRender = async (req, res) => {
    const userId = req.query.userId;
    const data = req.session.userInfo;
    if (data) {
        if (data.id == userId) {
            const userData = await User.findOne({
                where: { id: userId },
            });
            res.render('myPage/myFavoriteCon', { data: userData.dataValues });
        } else {
            res.render('404');
        }
    } else {
        res.render('login');
    }
};

//마이페이지: 내가 등록 신청한 행사 보기
// exports.myRegisterConRender = async (req, res) => {
//     const userId = req.query.userId;
//     const data = req.session.userInfo;
//     if (data) {
//         if (data.id == userId) {
//             const userData = await Conference.findAll({
//                 where: { user_id: userId },
//             });
//             if (userData.length > 0) {
//                 const user_id_num = userData[0].dataValues.user_id;
//                 res.render('myPage/myRegisterCon', { data: userData, id: user_id_num });
//             }
//             else {
//                 res.render('myPage/myRegisterCon', { data: false , id : -1 });
//             }
//         } else {
//             res.render('404');
//         }
//     } else {
//         res.render('login');
//     }
// };
exports.myRegisterConRender = async (req, res) => {
    const userId = req.query.userId;
    const data = req.session.userInfo;
    if (data) {
        if (data.id == userId) {
            const userData = await Conference.findAll({
                where: { user_id: userId },
            });
            if (userData.length > 0) {
                const user_id_num = userData[0].dataValues.user_id;
                res.render('myPage/myRegisterCon', { data: userData, id: user_id_num });
            }
            else {
                // 데이터가 없을 때 예외 처리 메시지를 보내기
                res.render('myPage/myRegisterCon', { data: '', id: data.id });
            }
        } else {
            res.render('404');
        }
    } else {
        res.render('login');
    }
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

// 마이페이지: 내가 쓴 리뷰 목록 불러오기
exports.getmyreviewList = async (req, res) => {
    try {
        const reviews = await ConferenceReview.findAll({
            where: { user_id: req.query.userId },
        });

        const reviewPromises = reviews.map(async (review) => {
            const conId = review.con_id;
            const relatedConference = await Conference.findOne({
                where: { con_id: conId },
            });
            return {
                review,
                relatedConference,
            };
        });
        const results = await Promise.all(reviewPromises);
        res.send({ results });
    } catch (error) {
        console.error(error);
        res.status(500).send('get myreviewList Error');
    }
};

// 마이페이지: 내가 쓴 리뷰 삭제
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

// 마이페이지: 내가 찜한 행사 목록 불러오기
exports.getmyFavoriteList = async (req, res) => {
    try {
        const favorites = await ConFavorite.findAll({
            where: { user_id: req.query.userId },
        });
        const favoriteLengths = [];
        for (let i = 0; i < favorites.length; i++) {
            const favoriteCon_id = favorites[i].dataValues.con_id;
            const favoritesLength = await ConFavorite.findAll({
                where: { con_id: favoriteCon_id },
            });
            favoriteLengths.push(favoritesLength.length);
        }
        const getFavorites = await Promise.all(
            favorites.map(async (favorite) => {
                const conference = await Conference.findOne({
                    where: { con_id: favorite.con_id },
                });
                return conference.dataValues;
            })
        );
        res.send({ getFavorites, favoriteLengths });
    } catch (error) {
        console.error(error);
        res.status(500).send('get myFavoriteList Error');
    }
};

// 마이페이지: 찜한 항목 삭제
exports.deleteMyFavorite = async (req, res) => {
    const conId = req.body.con_id;
    const result = await ConFavorite.destroy({
        where: { con_id: conId },
    });
    if (result === 1) {
        res.send(true);
        return;
    } else {
        res.send(false);
    }
};

// 마이페이지: 찜한 행사 중 리뷰 남기기
exports.getwriteReview = async (req, res) => {
    const conId = req.query.conId;
    const conData1 = await Conference.findOne({
        where: { con_id: conId },
    });
    const conData2 = [conData1.dataValues];
    res.render('review/write', { eventName: conData2, prevPage: 1 });
};

// 비밀번호 암호화 함수
const saltRounds = 5;
function bcryptPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
}

function compareFunc(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}
