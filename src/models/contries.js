const { Sequelize, DataTypes } = require("sequelize");

const { sequelize } = require("../database/datasource");

const Countries = sequelize.define(
  "countries",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    country_name: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Countries;
