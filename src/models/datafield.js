const { Sequelize, DataTypes } = require("sequelize");

const { sequelize } = require("../database/datasource");

const Datafields = sequelize.define(
  "datafields",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    field_name: {
      type: DataTypes.STRING,
    },
    group: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Datafields;
