const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../database/datasource");
const User = require("./user");
const Organizations = require("./organization");
const Document = require("./document");

const Tag = sequelize.define(
  "tag",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    document_id: {
      type: DataTypes.UUID,
      references: {
        model: "documents",
        key: "invoice_id",
      },
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: "false",
    },
    organizations_id: {
      type: Sequelize.UUID,
      references: {
        model: "organizations",
        key: "id",
      },
    },

    user_id: {
      type: Sequelize.UUID,
      references: {
        model: "users",
        key: "id",
      },
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "tags",
    paranoid: true,
  }
);

Document.hasMany(Tag, {
  foreignKey: "document_id", // Update the foreign key to match the one in the Tag model
  as: "documentTags", // Provide a unique alias for the association
});

Tag.belongsTo(Document, {
  foreignKey: "document_id", // Update the foreign key to match the one in the Document model
  as: "document", // Provide a unique alias for the association
});
Organizations.hasMany(Tag, {
  foreignKey: "organizations_id", // Update the foreign key to match the one in the Tag model
  as: "organizationTags", // Provide a unique alias for the association
});

Tag.belongsTo(Organizations, {
  foreignKey: "organizations_id", // Update the foreign key to match the one in the Document model
  as: "organization", // Provide a unique alias for the association
});
User.hasMany(Tag, {
  foreignKey: "user_id", // Update the foreign key to match the one in the Tag model
  as: "userTags", // Provide a unique alias for the association
});

Tag.belongsTo(User, {
  foreignKey: "user_id", // Update the foreign key to match the one in the Document model
  as: "user", // Provide a unique alias for the association
});

module.exports = Tag;
