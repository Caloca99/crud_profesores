const mysql = require("mysql2/promise");

const url = new URL(process.env.DATABASE_URL);

const pool = mysql.createPool({
  host: url.hostname,
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.replace("/", ""),
  port: Number(url.port),
  ssl: {
    rejectUnauthorized: false,
  },
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
