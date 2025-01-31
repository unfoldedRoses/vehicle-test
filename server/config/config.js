require('dotenv').config();
console.log(process.env.DB_USERNAME);


console.log("sddddd",process.env.DB_USERNAME)
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "postgres",
  },
  test: {
    username: process.env.TEST_DB_USERNAME || process.env.DB_USERNAME,
    password: process.env.TEST_DB_PASSWORD || process.env.DB_PASSWORD,
    database: process.env.TEST_DB_DATABASE || process.env.DB_DATABASE,
    host: process.env.TEST_DB_HOST || "postgres",
    dialect: process.env.DB_DIALECT,
  },
  production: {
    username: process.env.PRODUCTION_DB_USERNAME || process.env.DB_USERNAME,
    password: process.env.PRODUCTION_DB_PASSWORD || process.env.DB_PASSWORD,
    database: process.env.PRODUCTION_DB_DATABASE || process.env.DB_DATABASE,
    host: process.env.PRODUCTION_DB_HOST || process.env.DB_HOST,
    dialect: process.env.DB_DIALECT|| "postgres",
  },
};