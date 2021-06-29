const mySql = require('mysql');
const config = require('../config/database.config');
const con = mySql.createConnection(config.development.connection);

con.connect(function (err) {
    if (err) {
        console.log("MYSQL connection error");
        throw err;
    };
    console.log("MySQL connection established");
});

module.exports = con;
