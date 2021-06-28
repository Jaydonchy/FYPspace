//Importing Module
const express = require('express');
const app = express();

//Middleware

//Database Connection
const dbConfig = require ("./src/config/db.config");
const env = require('dotenv').config();

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