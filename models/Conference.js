const { DataTypes } = require('sequelize');

const Conference = (Sequelize, sequelize) => {
    const model = Sequelize.define(
        'conference_info',
        {
            con_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },

            con_title: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },

            con_start_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },

            con_end_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },

            sub_start_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },

            sub_end_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },

            is_onoff: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },

            con_location: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },

            con_category: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },

            con_company: {
                type: DataTypes.STRING(20),
                allowNull: true,
            },

            con_isfree: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },

            con_price: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: true,
            },

            con_people: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },

            con_company_url: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },

            con_count: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: true,
            },
            con_detail: {
                type: DataTypes.TEXT('medium'),
                allowNull: false,
            },
            con_image: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            is_agreed: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            con_detail_location: {
                type: DataTypes.JSON,
                allowNull: true,
            },
        },
        {
            tableName: 'conference_info',
            freezeTableName: true,
            timestamps: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        }
    );
    return model;
};
module.exports = Conference;
