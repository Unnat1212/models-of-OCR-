const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("../database/datasource");
const User = require("./user");

const Notifications = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requested_by: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("read", "unread"),
      allowNull: false,
      defaultValue: "unread",
    },
  },
  {
    tableName: "notifications",
  }
);

User.hasMany(Notifications, {
  foreignKey: "requested_by",
});
Notifications.belongsTo(User, {
  foreignKey: "requested_by",
});

module.exports = Notifications;
