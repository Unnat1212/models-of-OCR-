const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/datasource");

const User = require("./user");

const RefreshToken = sequelize.define(
  "refreshtoken",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    expiry_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

RefreshToken.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasOne(RefreshToken, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = RefreshToken;
