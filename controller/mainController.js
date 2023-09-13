const { ConferenceReview } = require('../models'); // ../models/index.js
const { Conference } = require('../models'); // ../models/index.js

exports.index = async (req, res) => {
    const data = req.session.userInfo;
    const reviews = await ConferenceReview.findAll({
        limit: 10,
    });
    const events = await Conference.findAll({
        limit: 10,
    });
    res.render('index', { data, reviews, events });
};
