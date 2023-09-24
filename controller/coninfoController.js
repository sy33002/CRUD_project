const { Conference, Sequelize, ConferenceReview } = require('../models');
const { ConFavorite } = require('../models');
const { Op } = require('sequelize');
const { User } = require('../models');
const nodemailer = require('nodemailer');

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
        const eventList = await Conference.findAll({
            where: { whereConditions, is_agreed: true },
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
    const userId = res.locals.Id;

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

    const result3 = await ConFavorite.findOne({
        where: {
            [Op.and]: [{ con_id: id }, { user_id: userId }],
        },
    });
    let confavoriteValue = 0;
    if (result3) {
        confavoriteValue = 1;
    }
    res.render(`event/detail`, {
        conference: result1,
        confavorite: result2.length,
        user_id: res.locals.Id,
        reviews: reviews,
        confavoriteValue: confavoriteValue,
    });
};
//행사 등록
exports.postConference = async (req, res) => {
    const userId = res.locals.Id;
    // console.log('유저아이디 세션값 넘어옴??', userId);
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
        console.log('유저아이디 세션값 넘어옴??', res.locals[0]); //세션값 없으면 0, 있으면 자연수
        console.log(!(userId === 0));
        if (res.locals[0] === undefined) {
            //로그인 하지 않고 행사 등록하는 경우
            return res.send({ result: 2 });
        } else {
            //세션값이 0이 아닌게 참===로그인 한 경우
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
            return res.send({ result: 1 }); //로그인 후 행사 등록 성공한경우
        }
    } catch (err) {
        console.error(err);
        return res.send({ result: 3 }); //알수없는 에러로 등록 되지 않는 경우
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
        res.send({ result: 3, id }); //찜 성공
    }
};

exports.postDisagreeConferenceList = async (req, res) => {
    const eventList = await Conference.findAll({
        where: { is_agreed: false },
    });
    res.send({ eventList });
};

exports.sentEmail = async (req, res) => {
    // const event = await Conference.findOne({
    //     where: { con_id: req.params.id },
    // });
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'addr@gmail.com', // 발신자 이메일 주소
            pass: 'password', // 발신자 이메일 비밀번호 또는 앱 비밀번호
        },
    });
    const { name, emailAddr, emailContent } = req.body;
    const mailOptions = {
        from: 'cocobell33@gmail.com', // 발신자 이메일 주소
        to: emailAddr, // 수신자 이메일 주소
        subject: '문의 이메일',
        text: `이름: ${name}\n이메일: ${emailAddr}\n문의 내용: ${emailContent}`,
    };

    // 이메일 전송
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.send({ result: false });
        } else {
            console.log('이메일 전송 성공:', info.response);
            res.status(200).send({ result: true });
        }
    });
};
