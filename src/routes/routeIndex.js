const express = require('express');
const router = express.Router();


const userRoutes = require("./userRoutes");
const studentRoutes = require("./studentRoutes");

router.use('/user',userRoutes);
router.use('/student',studentRoutes);

module.exports = router;
