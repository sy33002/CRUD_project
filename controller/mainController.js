const { ConferenceReview } = require('../models'); // ../models/index.js
const { Conference } = require('../models'); // ../models/index.js
const { Sequelize, Op } = require('sequelize');
const moment = require('moment');

exports.index = async (req, res) => {
    const data = req.session.userInfo;
    const currentDate = moment(); //현재 날짜 출력
    const oneMonthAgo = moment().subtract(1, 'months'); // 1달전 날짜 출력
    const limit = 10;

    try {
        const reviews = await ConferenceReview.findAll({
            where: {
                re_date: {
                    [Op.between]: [oneMonthAgo, currentDate],
                },
            },
            limit: limit,
            order: [
                ['re_date', 'DESC'],
                ['re_count', 'DESC'],
            ],
        });
        console.log('reviews : ', reviews);
        const events = await Conference.findAll({
            where: {
                is_agreed: true,
                con_end_date: {
                    [Op.gte]: currentDate,
                },
            },
            limit: limit,
            order: [['con_count', 'DESC']],
        });
        res.render('index', { data, reviews, events });
    } catch (err) {
        console.log('server error', err);
    }
};
