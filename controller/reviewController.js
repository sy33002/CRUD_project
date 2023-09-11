const { ConferenceReview, Sequelize } = require('../models'); // ../models/index.js
const { Op } = require('sequelize');

exports.getReview = async (req, res) => {
    // res.render('review/list');
    try {
        const reviews = await ConferenceReview.findAll();
        res.render('review/list', {
            result: reviews,
        });
    } catch (err) {
        console.log(err);
        res.send('Server Error');
    }
};

exports.postReview = async (req, res) => {
    console.log(req.body);
    const result = await ConferenceReview.create({
        con_id: 1,
        re_title: req.body.subject,
        re_content: req.body.content,
        re_date: Date.now(),
    });
    res.send(result);
};

exports.deleteReview = async (req, res) => {
    const result = await ConferenceReview.destroy({
        where: { re_id: 1 },
    });
    res.send(true);
};

exports.getReviewWrite = (req, res) => {
    res.render('review/write');
};
