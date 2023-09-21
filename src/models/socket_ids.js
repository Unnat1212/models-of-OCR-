const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/datasource");
const User = require("./user");

const socket_ids = sequelize.define(
  "socket_ids",
  {
    socket_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
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
    tableName: "socket_ids",
  }
);

User.hasMany(socket_ids, {
  foreignKey: "user_id",
});
socket_ids.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = socket_ids;
