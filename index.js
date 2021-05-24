//Database Connection
const dbConfig = require ("./config/db.config.js");
const mySql = require('mysql');

var con = mySql.createConnection({
    host: dbConfig.DB_HOST,
    user: dbConfig.DB_USER,
    password: dbConfig.DB_PASSWORD,
    database: dbConfig.DB_NAME,
});

con.connect((err) => {
    if (err) {
        throw err;
    };
    console.log("MySQL connected...");
});

//Importing Module
const express = require('express');
const Joi = require('joi');

//Calls a function that returns an Express Object
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World...');
});

//PORT Connection
const ENV = require("./config/environment.config");  
app.listen(ENV.CONN_PORT, () => console.log(`Listening on port ${ENV.CONN_PORT} ...`));