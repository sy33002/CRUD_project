const { ConferenceReview } = require('../models'); // ../models/index.js
const { Conference } = require('../models'); // ../models/index.js

exports.index = async (req, res) => {
    const data = req.session.userInfo;
    const reviews = await ConferenceReview.findAll({
        limit: 10,
        order: [['re_id', 'DESC']],
    });
    const events = await Conference.findAll({
        where: {
            is_agreed: true,
        },
        limit: 10,
        order: [['con_id', 'DESC']],
    });
    res.render('index', { data, reviews, events });
};
