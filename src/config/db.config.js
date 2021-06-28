const mySql = require('mysql');
DB_HOST = "localhost";
DB_USER = 'root';
DB_PASSWORD = "";
DB_NAME = "fypspace";

const con = mySql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
});

con.connect(function(err) {
    if (err) {
        console.log("error detected");
        throw err;
    };
    console.log("MySQL connected...");
});

module.exports = con;
