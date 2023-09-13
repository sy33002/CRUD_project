const { Conference, Sequelize } = require('../models');
const { Op } = require('sequelize');

// ../models/index.js
const cookieParser = require('cookie-parser');
//ip를 가져오는 함수
function getUserIP(req) {
    const addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return addr;
}
async function searchConferenceList(req, res) {
    const { isOnoff, conLocation, conCategory, conIsfree } = req.query;
    console.log('req query =====', req.query);
    if (isOnoff === 2 && conIsfree === 2) {
        //오프라인 온라인에서 전체를 선택하면
        const conferenceRes = await Conference.findAll({
            where: {
                [Op.and]: [
                    { con_location: conLocation },
                    { con_category: conCategory },
                ],
            },
        });
        return conferenceRes;
    } else if (isOnoff === 2) {
        const conferenceRes = await Conference.findAll({
            where: {
                [Op.and]: [
                    { con_location: conLocation },
                    { con_category: conCategory },
                    { con_isfree: conIsfree },
                ],
            },
        });
        return conferenceRes;
    } else if (conIsfree === 2) {
        const conferenceRes = await Conference.findAll({
            where: {
                [Op.and]: [
                    { is_onoff: isOnoff },
                    { con_location: conLocation },
                    { con_category: conCategory },
                ],
            },
        });
        return conferenceRes;
    } else {
        const conferenceRes = await Conference.findAll({
            where: {
                [Op.and]: [
                    { is_onoff: isOnoff },
                    { con_location: conLocation },
                    { con_category: conCategory },
                    { con_isfree: conIsfree },
                ],
            },
        });
        return conferenceRes;
    }
}
exports.getConferenceList = async (req, res) => {
    try {
        let conference;
        console.log(req.body);
        if (!Object.keys(req.query).length) {
            //req.query가 빈 객체면

            conference = await Conference.findAll();
            return res.render('event/list', { conference });
        } else {
            console.log('ddddddd');
            conference = await searchConferenceList(req);
            // console.log('>>>>>>>', conference);
            return res.send({ conference });
        }
    } catch (err) {
        console.log(err);
        res.send('server error');
    }
};
exports.getConferenceWrite = (req, res) => {
    res.render('event/write');
};

exports.getConferenceDetail = async (req, res) => {
    const { id } = req.query;
    console.log(id);
    const result = await Conference.findOne({
        where: { con_id: id },
    });

    res.render(`event/detail`, { result });
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
exports.updateConferenceCnt = async (req, res) => {
    if (req.cookies[conId] == undefined) {
        // key, value, 옵션을 설정해준다.
        res.cookie(conCount, getUserIP(req), {
            // 유효시간 : 일주일
            maxAge: 60 * 60 * 24 * 7,
        });
        // 조회수 증가 쿼리
        await Conference.updateOne(
            { con_id: conId },
            { $inc: { con_count: 1 } }
        );
    }
    res.render({ conCount: Conference.con_count });
    //ejs에서 conCount라는 변수를 써서 조회수를 보이게 하면 될 것 같습니다..
};

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
//아골 험슗 먼둘어서 exports.getConferenceList여기에 넣어야함..
