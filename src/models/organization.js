const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/datasource");
const Organizations = sequelize.define(
  "organizations",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    organization_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

module.exports = Organizations;
