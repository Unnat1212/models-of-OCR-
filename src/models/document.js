const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/datasource");
const User = require("./user");
const Organizations = require("./organization");

const Document = sequelize.define(
  "documents",
  {
    invoice_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    document_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    document_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("completed", "pending", "failed"),
      allowNull: false,
    },
    uploaded: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    exported: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    validated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mapped_result: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    organizations_id: {
      type: DataTypes.UUID,
      references: {
        model: "organizations",
        key: "id",
      },
    },

    requested_by: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    tableName: "documents",
    paranoid: true,
  }
);

User.hasMany(Document, {
  foreignKey: "requested_by",
});
Document.belongsTo(User, {
  foreignKey: "requested_by",
});

Organizations.hasMany(Document, {
  foreignKey: "organizations_id",
});
Document.belongsTo(Organizations, {
  foreignKey: "organizations_id",
});

module.exports = Document;
