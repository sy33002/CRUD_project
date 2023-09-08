const { ConferenceReview, Sequelize } = require('../models'); // ../models/index.js

exports.getReview = (req, res) => {
    res.render('review/list');
};

exports.getReviewWrite = (req, res) => {
    res.render('review/write');
};
