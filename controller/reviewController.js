const { ConferenceReview, Sequelize } = require('../models'); // ../models/index.js
const { Op } = require('sequelize');

exports.getReview = async (req, res) => {
    // res.render('review/list');
    try {
        const reviews = await ConferenceReview.findAll();
        res.send(reviews);
    } catch (err) {
        console.log(err);
        res.send('Server Error');
    }
};

exports.getReviewWrite = (req, res) => {
    res.render('review/write');
};
