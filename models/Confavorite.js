const { DataTypes } = require('sequelize');
const ConFavorite = (Sequelize, sequelize) => {
    const model = Sequelize.define(
        'con_favorite',
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            con_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            is_favorite: {
                type: DataTypes.BOOLEAN,
                defaultValue: 0,
                allowNull: false,
            },
        },
        {
            tableName: 'con_favorite', // 실제 db 테이블명
            freezeTableName: true, // 테이블명 고정 (모델 이름 테이블로 바꿀 때 복수형으로 바뀜)
            timestamps: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    );
    return model;
};

module.exports = ConFavorite;
