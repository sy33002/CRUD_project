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
const ConFavorite = require('./Confavorite')(sequelize, Sequelize);

// Conference와 리뷰 외래키
Conference.hasOne(ConferenceReview, {
    foreignKey: 'con_id',
    sourceKey: 'con_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
ConferenceReview.belongsTo(Conference, {
    foreignKey: 'con_id',
    targetKey: 'con_id',
});
//Conference와 user 외래키(한 유저가 여러가지 Conference 등록 가능)
User.hasOne(Conference, {
    foreignKey: 'user_id', //로그인시 불러울 세션에서의 user_id
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Conference.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id',
});
//Conferece와 confavorite 외래키
Conference.hasMany(ConFavorite, {
    foreignKey: 'con_id',
    sourceKey: 'con_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
ConFavorite.belongsTo(Conference, {
    foreignKey: 'con_id',
    targetKey: 'con_id',
});
//User와 confavorite 외래키
User.hasOne(ConFavorite, {
    foreignKey: 'user_id',
    sourceKey: 'id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
ConFavorite.belongsTo(User, {
    foreignKey: 'user_id',
    targetKey: 'id',
});

// 모델 db 객체에 저장
db.Conference = Conference;
db.User = User;
db.ConferenceReview = ConferenceReview;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
