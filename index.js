//Importing Module
const express = require('express');
const app = express();
const env = require('dotenv').config();
const cors = require('cors');

//Middleware
app.use(express.json());
app.use(cors());

//Database Connection
const dbConnection = require ("./src/Helper/mysql-connection");

//Routes
const router = require('./src/routes/routeIndex');

app.use('/api',router);

//PORT Connection
const port = process.env.PORT || '3200';
app.listen( port , () => {
    console.log(`Listening on port ${port} ...`);   
});