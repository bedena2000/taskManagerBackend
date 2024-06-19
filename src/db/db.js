const { Sequelize } = require("sequelize");
const config = require("./config");

const database = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "mysql",
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = database;

module.exports = db;
