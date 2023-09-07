const { DataTypes } = require('sequelize');

const User = (Sequelize, sequelize) => {
    const model = Sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
        user_id: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        user_pw: {
            type: DataTypes.STRING(255),
        },
        user_name : {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        user_addr : {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        user_email : {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        user_category : {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
    }, {
        tableName: 'user',
        freezeTableName: true,
        timestamps: false,
    });
    return model;
};
module.exports = User;