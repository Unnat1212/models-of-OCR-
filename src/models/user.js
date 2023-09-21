const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();
const { sequelize } = require("../database/datasource");
const Roles = require("./roles");
const Organizations = require("./organization");
const Countries = require("./contries");
const Datafields = require("./datafield");
const DatafieldsConfig = require("./datafield_config");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "roles",
        key: "id",
      },
    },
    admin_id: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
    },
    country_id: {
      type: DataTypes.UUID,
      references: {
        model: "countries",
        key: "id",
      },
    },
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
        notIn: [["passoword", "PASSWORD"]],
      },
    },
    phone_no: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isIndianMobileNumber: function (value) {
          const mobileNumberRegex = /^[6-9]\d{9}$/;
          if (!mobileNumberRegex.test(value)) {
            // throw new Error(utill.error.indianPhoneNumber);
          }
        },
      },
    },
    organization_id: {
      type: DataTypes.UUID,
      references: {
        model: "organizations",
        key: "id",
      },
    },
    avatar: {
      type: DataTypes.STRING,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_registered: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

User.belongsTo(Roles, { foreignKey: "role_id" });
Roles.hasMany(User, { foreignKey: "role_id" });

User.hasMany(User, { as: "Members", foreignKey: "admin_id" });

User.belongsTo(Organizations, { foreignKey: "organization_id" });
Organizations.hasMany(User, { foreignKey: "organization_id" });

User.belongsTo(Countries, { foreignKey: "country_id" });
Countries.hasMany(User, { foreignKey: "country_id" });

User.belongsToMany(Datafields, {
  through: "datafield_config",
  foreignKey: "user_id",
});
Datafields.belongsToMany(User, {
  through: "datafield_config",
  foreignKey: "datafield_id",
});

DatafieldsConfig.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(DatafieldsConfig, { foreignKey: "user_id" });

DatafieldsConfig.belongsTo(Datafields, { foreignKey: "datafield_id" });
Datafields.hasMany(DatafieldsConfig, { foreignKey: "datafield_id" });

module.exports = User;
