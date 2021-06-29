//Importing Module
const express = require('express');
const app = express();
const env = require('dotenv').config();

//Middleware

//Database Connection
const dbConnection = require ("./src/Helper/mysql-connection");

//Routes
const userRoutes = require("./src/routes/userRoutes");
app.use("/user",userRoutes);


app.get('/', (req, res) => {
    res.send('Hello World...');
});

//PORT Connection
const port = process.env.PORT || '3200';
app.listen( port , () => {
    console.log(`Listening on port ${port} ...`);   
});