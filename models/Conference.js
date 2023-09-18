const { DataTypes } = require('sequelize');
const moment = require('moment');

const Conference = (Sequelize, sequelize) => {
    const model = Sequelize.define(
        'conference_info',
        {
            con_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
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
                get() {
                    const date = this.getDataValue('con_start_date');
                    return moment(date).format('YY.MM.DD HH:mm');
                },
            },

            con_end_date: {
                type: DataTypes.DATE,
                allowNull: false,
                get() {
                    const date = this.getDataValue('con_end_date');
                    return moment(date).format('YY.MM.DD HH:mm');
                },
            },

            sub_start_date: {
                type: DataTypes.DATE,
                allowNull: false,
                get() {
                    const date = this.getDataValue('sub_start_date');
                    return moment(date).format('YY.MM.DD HH:mm');
                },
            },

            sub_end_date: {
                type: DataTypes.DATE,
                allowNull: false,
                get() {
                    const date = this.getDataValue('sub_end_date');
                    return moment(date).format('YY.MM.DD HH:mm');
                },
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
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                get() {
                    const date = this.getDataValue('createdAt');
                    return moment(date).format('YY.MM.DD HH:mm');
                },
            },

            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                get() {
                    const date = this.getDataValue('updatedAt');
                    return moment(date).format('YY.MM.DD HH:mm');
                },
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
