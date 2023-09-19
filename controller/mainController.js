const { ConferenceReview } = require('../models'); // ../models/index.js
const { Conference } = require('../models'); // ../models/index.js
const { Sequelize, Op } = require('sequelize');
exports.index = async (req, res) => {
    const data = req.session.userInfo;
    const currentDate = new Date();
    const reviews = await ConferenceReview.findAll({
        limit: 10,
        order: [['re_id', 'DESC']],
    });
    const events = await Conference.findAll({
        where: {
            is_agreed: true,
            con_end_date: {
                [Op.gte]: currentDate,
            },
        },
        limit: 10,
        order: [['con_count', 'DESC']],
    });
    res.render('index', { data, reviews, events });
};
