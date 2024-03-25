require('dotenv').config()

const Pool = require("pg").Pool;

const createNewPool = () => {
  const pool = new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
  return pool;
}

module.exports = {
  createNewPool
};