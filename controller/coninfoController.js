const { Conference, Sequelize } = require('../models'); // ../models/index.js

exports.index = (req, res) => {
    // index.ejs 랜더 (data 키로 session 객체의 userInfo 전달)
    res.render('index');
};
