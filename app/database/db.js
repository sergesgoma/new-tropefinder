require("dotenv").config({ path: "./.env" });
// const { Sequelize } = require("sequelize");

//creation of the sequelize object that all the models will use to communicate with the DB
// const db = new Sequelize("tropefinder", "postgres", process.env.PG_PASSWORD, {
//   host: "localhost",
//   dialect: "postgres",
// });

const { Pool } = require("pg");
const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tropefinder",
  password: process.env.PG_PASSWORD,
  port: 5432,
});

module.exports = db;
