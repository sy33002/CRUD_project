const { Conference, Sequelize, ConferenceReview } = require('../models');
const { ConFavorite } = require('../models');
const { Op } = require('sequelize');

// ../models/index.js
const cookieParser = require('cookie-parser');
//ip를 가져오는 함수
function getUserIP(req) {
    const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return addr;
}

// async function searchConferenceList(req, res) {
//     const { isOnoff, conLocation, conCategory, conIsfree } = req.body;
//     console.log('isOnoff>>>>>>>>>>>>>>', isOnoff);
//     if (
//         isOnoff === undefined ||
//         conLocation === undefined ||
//         conCategory === undefined ||
//         conIsfree === undefined
//     ) {
//         console.log('없음');
//     }
//     if (isOnoff === 2 && conIsfree === 2) {
//         //오프라인 온라인에서 전체를 선택하면
//         console.log('전체');
//         const conferenceRes = await Conference.findAll({
//             where: {
//                 [Op.and]: [
//                     { con_location: conLocation },
//                     { con_category: conCategory },
//                 ],
//             },
//         });
//         return conferenceRes;
//     } else if (isOnoff === 2) {
//         console.log('isOnoff === 2');
//         const conferenceRes = await Conference.findAll({
//             where: {
//                 [Op.and]: [
//                     { con_location: conLocation },
//                     { con_category: conCategory },
//                     { con_isfree: conIsfree },
//                 ],
//             },
//         });
//         return conferenceRes;
//     } else if (conIsfree === 2) {
//         console.log('conIsfree === 2');
//         const conferenceRes = await Conference.findAll({
//             where: {
//                 [Op.and]: [
//                     { is_onoff: isOnoff },
//                     { con_location: conLocation },
//                     { con_category: conCategory },
//                 ],
//             },
//         });
//         return conferenceRes;
//     } else {
//         console.log('else');
//         const conferenceRes = await Conference.findAll({
//             where: {
//                 [Op.and]: [
//                     { is_onoff: isOnoff },
//                     { con_location: conLocation },
//                     { con_category: conCategory },
//                     { con_isfree: conIsfree },
//                 ],
//             },
//         });
//         return conferenceRes;
//     }
// }

// exports.getConferenceList = async (req, res) => {
//     try {
//         let conference;
//         console.log('req.body22222====', req.body);
//         if (!Object.keys(req.body).length) {
//             //req.query가 빈 객체면

//             conference = await Conference.findAll();
//             return res.render('event/list');
//         } else {
//             console.log('ddddddd');
//             conference = await searchConferenceList(req);
//             console.log('>>>>>>>', conference);
//             return res.send({ conference });
//         }
//     } catch (err) {
//         console.log(err);
//         res.send('server error');
//     }
// };

// 순수 리스트 렌더역할
exports.getConferenceList = (req, res) => {
    return res.render('event/list');
};
//캘린더 페이지로드
exports.getConferenceCalendar = (req, res) => {
    return res.render('event/calendar');
};

// event/list에 모든 행사 리스트 넘겨주는 함수
exports.getConferenceInfo = async (req, res) => {
    const eventList = await Conference.findAll({
        where: {
            is_agreed: true,
        },
    });
    res.send({ eventList });
};

// 필터링 역할
exports.postConferenceList = async (req, res) => {
    try {
        const { isOnoff, conLocation, conCategory, conIsfree } = req.body;
        const whereConditions = {};
        if (isOnoff !== '') whereConditions.is_onoff = isOnoff;
        if (conLocation !== '') whereConditions.con_location = conLocation;
        if (conIsfree !== '') whereConditions.con_isfree = conIsfree;
        if (conCategory !== 'all') {
            // or 조건 추가
            whereConditions[Op.or] = [
                { con_category: conCategory },
                // 다른 OR 조건을 추가할 수도 있습니다.
            ];
        }
        console.log(whereConditions, 'filter 결과 값');
        const eventList = await Conference.findAll({
            where: whereConditions,
        });
        res.send({ eventList });
    } catch (err) {
        console.log(err);
        res.send('server error');
    }
};

exports.getConferenceWrite = (req, res) => {
    res.render('event/write');
};

//행사 상세페이지
exports.getConferenceDetail = async (req, res) => {
    const { id } = req.params;

    console.log(id);

    const result1 = await Conference.findOne({
        where: { con_id: id },
    }); //컨퍼런스 전체 정보

    const reviews = await ConferenceReview.findAll({
        where: { con_id: id },
    });
    if (result1) {
        await result1.increment('con_count', { by: 1 });
    }

    const result2 = await ConFavorite.findAll({
        where: { con_id: id },
    });
    console.log('유저 세션 아이디값', res.locals.Id);
    res.render(`event/detail`, {
        conference: result1,
        confavorite: result2.length,
        user_id: res.locals.Id,
        reviews: reviews,
    });
};

//게시글 등록(DB에 저장까지만~)
exports.postConference = async (req, res) => {
    const {
        conTitle,
        conStartDate,
        conEndDate,
        subStartDate,
        subEndDate,
        isOnoff,
        conLocation,
        conCategory,
        conCompany,
        conIsfree,
        conPrice,
        conPeople,
        conCompanyUrl,
        conCount,
        conImagePath,
        conDetail,
        conDetailAddr,
    } = req.body;

    try {
        const result = await Conference.create({
            con_title: conTitle,
            con_start_date: conStartDate,
            con_end_date: conEndDate,
            sub_start_date: subStartDate,
            sub_end_date: subEndDate,
            is_onoff: isOnoff,
            con_location: conLocation,
            con_category: conCategory,
            con_company: conCompany,
            con_isfree: conIsfree,
            con_price: conPrice,
            con_people: conPeople,
            con_company_url: conCompanyUrl,
            con_count: conCount,
            con_detail: conDetail,
            con_image: conImagePath,
            user_id: req.session.userInfo.id,
            con_detail_location: conDetailAddr,
        });
        res.send({ result: true });
    } catch (err) {
        console.error(err);
        res.send({ result: false });
    }

    //관리자 페이지 안만들면 /event경로로 갑니다..
    // res.redirect('/');
    //관리자 페이지가 있을 경우
    //res.render('관리자페이지',{result})
};
// exports.updateConferenceCnt = async (req, res) => {
//     if (req.cookies[conId] == undefined) {
//         // key, value, 옵션을 설정해준다.
//         res.cookie(conCount, getUserIP(req), {
//             // 유효시간 : 일주일
//             maxAge: 60 * 60 * 24 * 7,
//         });
//         // 조회수 증가 쿼리
//         await Conference.updateOne(
//             { con_id: conId },
//             { $inc: { con_count: 1 } }
//         );
//     }
//     res.render({ conCount: Conference.con_count });
//     //ejs에서 conCount라는 변수를 써서 조회수를 보이게 하면 될 것 같습니다..
// };

exports.postConferenceEdit = async (req, res) => {
    const {
        conTitle,
        conStartDate,
        conEndDate,
        subStartDate,
        subEndDate,
        isOnoff,
        conLocation,
        conCategory,
        conCompany,
        conIsfree,
        conPrice,
        conPeople,
        conCompanyUrl,
        conCount,
        conImagePath,
        conDetail,
    } = req.body;

    try {
        const result = await Conference.update(
            {
                con_title: conTitle,
                con_start_date: conStartDate,
                con_end_date: conEndDate,
                sub_start_date: subStartDate,
                sub_end_date: subEndDate,
                is_onoff: isOnoff,
                con_location: conLocation,
                con_category: conCategory,
                con_company: conCompany,
                con_isfree: conIsfree,
                con_price: conPrice,
                con_people: conPeople,
                con_company_url: conCompanyUrl,
                con_count: conCount,
                con_detail: conDetail,
                con_image: conImagePath,
            },
            {
                where: { con_id: req.body.conId },
            }
        );
        res.send({ result });
    } catch (err) {
        console.error(err);
    }
};
exports.saveConference = async (req, res) => {
    const isLiked = await ConFavorite.findOne({
        where: {
            user_id: res.locals.Id,
            con_id: req.body.con_id,
        },
    });
    console.log(req.body);
    if (res.locals.Id === 0) {
        res.send({ result: 1 }); //로그인 후 이용
    } else if (isLiked) {
        res.send({ result: 2 }); //이미 찜 눌렀음
    } else {
        await ConFavorite.create({
            user_id: res.locals.Id,
            con_id: req.body.con_id,
        });
        res.send({ result: 3 }); //찜 성공
    }
};

exports.postDisagreeConferenceList = async (req, res) => {
    const eventList = await Conference.findAll({
        where: { is_agreed: false },
    });
    console.log(eventList);
    res.send({ eventList });
};
