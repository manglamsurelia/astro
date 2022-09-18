var mysql = require('mysql');
const util = require("util");

const config = require('./config/config');

//sql connection check
let connection = mysql.createConnection(config.sql);

// promise wrapper to enable async await with MYSQL
connection.query = util.promisify(connection.query).bind(connection);

connection.connect(function (connection_err) {
    if (connection_err) {
        console.log('error when connecting to db:');
        throw connection_err;
    } else {
        console.log('database connected');
    }
});

module.exports = connection;