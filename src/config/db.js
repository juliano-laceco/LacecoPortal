const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: process.env.DATABASE_PASS,
    database: 'lacecodb',
    waitForConnections: true,
    connectionLimit: 1000000,  // Set a reasonable connection limit (e.g., 500)
    queueLimit: 0,         // Unlimited request queuing
};

let db;
if (!db) {
    db = mysql.createPool(dbConfig);
}

module.exports = db;
