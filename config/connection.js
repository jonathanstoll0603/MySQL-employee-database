const mysql = require('mysql');
require('dotenv').config();


// sql database object
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: '3306'
});

module.exports = connection;