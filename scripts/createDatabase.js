require("dotenv").config();

const { Sequelize } = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(
  "",
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  },
);

(async () => {
  await sequelize.query("DROP DATABASE IF EXISTS techblogdb;");
  await sequelize.query("CREATE DATABASE techblogdb;");
  console.log("Database techblogdb created!");
  process.exit(0);
})();