const { Pool } = require("pg");
const config = require("../config");
require("dotenv").config();

const newConnection = () => {
  return new Pool({
    user: config.DB_USER,
    password: config.DB_PASSWORD,
    host: config.DB_HOST,
    port: config.DB_PORT,
    database: config.DB_NAME,
  });
};
module.exports = newConnection;
