
const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'lacecodb',
    waitForConnections: true,
    connectionLimit: 1000, // Change this number to set the max number of connections
};

const db = mysql.createPool(dbConfig);

module.exports = db; 