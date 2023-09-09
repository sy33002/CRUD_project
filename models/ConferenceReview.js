const { DataTypes } = require('sequelize');

const ConferenceReview = (Sequelize, sequelize) => {
    const model = Sequelize.define(
        'con_review',
        {
            re_id: {
                // id INT NOT NULL PRIMARY KEY auto_increment,
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
                // varchar(100) not null,
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            re_content: {
                // medium not null,
                type: DataTypes.TEXT('medium'),
                allowNull: false,
            },
            re_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            re_count: {
                // int
                type: DataTypes.INTEGER,
                allowNull: true,
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
