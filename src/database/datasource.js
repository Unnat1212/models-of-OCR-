const { Sequelize } = require("sequelize");

const config = require("./config");

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  config.development
);

const connect = () => {
  return sequelize.authenticate();
};

module.exports = { sequelize, connect };
