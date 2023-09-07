'use strict';

const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json')['development'];
const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

// 모델 모듈 불러오기
const Conference = require('./Conference')(sequelize, Sequelize);
const User = require('./User')(sequelize, Sequelize);
const ConferenceReview = require('./ConferenceReview')(sequelize, Sequelize);

// Conference와 리뷰 외래키
ConferenceReview.hasOne(Conference, {
    foreignKey: 'con_id',
    sourceKey: 'con_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Conference.belongsTo(ConferenceReview);
// 모델 db 객체에 저장
db.Conference = Conference;
db.User = User;
db.ConferenceReview = ConferenceReview;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
