const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../database/datasource");
const Organizations = require("./organization");

const Payment = sequelize.define(
  "payments",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    organization_id: {
      type: DataTypes.UUID,
      references: {
        model: "organizations",
        key: "id",
      },
    },
    invoice_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount_per_month: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time_period: {
      type: Sequelize.ENUM("Monthly", "Yearly"),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM("Pending", "Failed", "Success"),
      allowNull: false,
    },
    uploaded_invoice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    no_of_credits: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    remaining_credits: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

Payment.belongsTo(Organizations, { foreignKey: "organization_id" });
Organizations.hasMany(Payment, {
  foreignKey: "organization_id",
  as: "payment",
});

module.exports = Payment;
