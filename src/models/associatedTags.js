const { Sequelize, DataTypes } = require("sequelize");

const { sequelize } = require("../database/datasource");

const AssociatedTag = sequelize.define("associated_tags", {
  document_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "documents",
      key: "id",
    },
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "tag",
      key: "id",
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = AssociatedTag;
