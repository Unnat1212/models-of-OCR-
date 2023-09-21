const { Sequelize, DataTypes } = require("sequelize");

const { sequelize } = require("../database/datasource");

const DatafieldsConfig = sequelize.define(
  "datafield_config",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id", // Primary key in the referenced table
      },
    },
    datafield_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "datafields", // Name of the referenced table
        key: "id", // Primary key in the referenced table
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = DatafieldsConfig;
