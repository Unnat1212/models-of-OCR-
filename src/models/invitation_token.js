const { Sequelize, DataTypes } = require("sequelize");

const { sequelize } = require("../database/datasource");
const User = require("./user");

const Invitation_tokens = sequelize.define(
  "invitation_tokens",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    user_id: {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    token: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: true,
  }
);

Invitation_tokens.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Invitation_tokens, { foreignKey: "user_id" });

module.exports = Invitation_tokens;
