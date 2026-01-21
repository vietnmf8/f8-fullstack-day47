const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "localhost",
    user: "viet",
    port: 3306,
    password: "Viet251001",
    database: "blog_dev",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

module.exports = pool;
