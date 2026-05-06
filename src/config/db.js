const mysql = require("mysql2/promise");

const connectionUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;

const baseConfig = connectionUrl
  ? (() => {
      const url = new URL(connectionUrl);
      return {
        host: url.hostname,
        user: decodeURIComponent(url.username),
        password: decodeURIComponent(url.password),
        database: url.pathname.replace("/", ""),
        port: Number(url.port || 3306),
      };
    })()
  : {
      host: process.env.DB_HOST || process.env.MYSQLHOST || "localhost",
      user: process.env.DB_USER || process.env.MYSQLUSER || "root",
      password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || "",
      database: process.env.DB_NAME || process.env.MYSQLDATABASE || "crud_profesores",
      port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
    };

const pool = mysql.createPool({
  ...baseConfig,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
