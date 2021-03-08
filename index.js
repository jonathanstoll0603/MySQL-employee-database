const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1014508j',
    database: 'employee_tracker_db'
});

connection.connect((err) => {
    if (err) throw err;

    console.log(`Connection established via thread #: ${connection.threadId}.`);

    connection.end();
})