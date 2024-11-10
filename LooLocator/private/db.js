const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config({
    path: '../private/.env'
});

const host = process.env.HOST;
const user = process.env.U;
const pass = process.env.PASS;

const connection = mysql.createConnection({
    host: host,
    user: user,
    password: pass,
    multipleStatements:true,
});

module.exports = connection;