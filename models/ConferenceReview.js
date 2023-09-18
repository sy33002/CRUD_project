const { DataTypes } = require('sequelize');
const moment = require('moment');

const ConferenceReview = (Sequelize, sequelize) => {
    const model = Sequelize.define(
        'con_review',
        {
            re_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            con_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            re_title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            re_content: {
                type: DataTypes.TEXT('medium'),
                allowNull: false,
            },
            re_date: {
                type: DataTypes.DATE,
                allowNull: false,
                get() {
                    const date = this.getDataValue('re_date');
                    return moment(date).format('YY.MM.DD HH:mm');
                },
            },
            re_count: {
                type: DataTypes.INTEGER,
                allowNull: true,
                defaultValue: 0,
            },
            user_id: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
            content_Text: {
                type: DataTypes.TEXT('medium'),
                allowNull: false,
            },
            con_title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        },
        {
            tableName: 'con_review', // 실제 db 테이블명
            freezeTableName: true, // 테이블명 고정 (모델 이름 테이블로 바꿀 때 복수형으로 바뀜)
            timestamps: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    );
    return model;
};

module.exports = ConferenceReview;
