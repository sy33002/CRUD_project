const { DataTypes } = require('sequelize');

const Conference = (Sequelize, sequelize) => {
  const model = Sequelize.define(
    "conference_info",
    {
      // 	con_id int not null primary key auto_increment,
      con_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      //     con_title varchar(100) not null,
      con_title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      //     con_start_date datetime not null,
      con_start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      //     con_end_date datetime not null,
      con_end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      //     sub_start_date datetime not null,
      sub_start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      //     sub_end_date datetime not null,
      sub_end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      //     is_onoff boolean not null,
      is_onoff: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      //     con_location varchar(20),
      con_location: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      //     con_category varchar(20),
      con_category: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      //     con_company varchar(20),
      con_company: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      //     con_isfree boolean not null,
      con_isfree: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      //     con_price int,
      con_price: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      //     con_people int,
      con_people: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      //     con_company_url varchar(255),
      con_company_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      //     con_count int
      con_count: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "conference_info",
      freezeTableName: true,
      timestamps: true,
    }
  );
  return model;
};
module.exports = Conference;
