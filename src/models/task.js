const { DataTypes, Sequelize } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { sequelize } = require("../database/datasource");
const Document = require("./document");
const User = require("./user");

const Task = sequelize.define(
  "tasks",
  {
    invoice_id: {
      type: DataTypes.UUID,
      references: {
        model: "documents",
        key: "invoice_id",
      },
      allowNull: true,
    },
    process_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    result: {
      type: DataTypes.JSONB,
      allowNull: true,
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
      type: Sequelize.ENUM("completed", "pending", "failed"),
      allowNull: false,
    },
  },
  {
    tableName: "tasks",
    paranoid: true,
  }
);

User.hasMany(Task, {
  foreignKey: "requested_by",
});
Task.belongsTo(User, {
  foreignKey: "requested_by",
});

Document.hasMany(Task, {
  foreignKey: "invoice_id",
});
Task.belongsTo(Document, {
  foreignKey: "invoice_id",
});

module.exports = Task;
