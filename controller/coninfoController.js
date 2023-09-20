const { Conference, Sequelize, ConferenceReview } = require('../models');
const { ConFavorite } = require('../models');
const { Op } = require('sequelize');
const { User } = require('../models');
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
    let whereClause = {
        is_agreed: true,
    };

    if (req.query.date) {
        // 쿼리문 있을 때만 필터
        const date = req.query.date;
        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);

        whereClause[Op.or] = [];

        whereClause[Op.or] = [
            {
                // 행사 기간이 해당 년, 월에 해당하는 거만 추출
                [Op.and]: [
                    { con_start_date: { [Op.gte]: startDate } },
                    { con_start_date: { [Op.lt]: endDate } },
                ],
            },
            {
                [Op.and]: [
                    { con_end_date: { [Op.gte]: startDate } },
                    { con_end_date: { [Op.lt]: endDate } },
                ],
            },
        ];
    }

    try {
        const eventList = await Conference.findAll({
            where: whereClause,
            order: [['con_end_date', 'ASC']],
        });

        res.send({ eventList });
    } catch (err) {
        console.log(err);
        res.send('server error');
    }
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
        detailText,
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
            detail_Text: detailText,
        });
        console.log(result, 'result');

        res.send({ result: true });
    } catch (err) {
        console.error(err);
        res.send({ result: false });
    }
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
        detailText,
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
                detail_Text: detailText,
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
    const id = await User.findOne({
        where: {
            id: res.locals.Id,
        },
    });
    if (res.locals.Id === 0) {
        res.send({ result: 1 }); //로그인 후 이용
    } else if (isLiked) {
        res.send({ result: 2, id }); //이미 찜 눌렀음
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
