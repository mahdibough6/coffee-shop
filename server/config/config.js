module.exports = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "resto_manager",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "3306",
    dialect: process.env.DB_DIALECT || "mysql"
  },
  test: {
    username: process.env.DB_USERNAME || "user",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "database_test",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "postgres"
  },
  production: {
    username: process.env.DB_USERNAME || "user",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "database_production",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "postgres"
  }
};