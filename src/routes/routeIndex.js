const express = require('express');
const router = express.Router();


const userRoutes = require("./userRoutes");
const studentRoutes = require("./studentRoutes");
const lecturerRoutes = require("./lecturerRoutes");

router.use('/user',userRoutes);
router.use('/student',studentRoutes);
router.use('/lecturer',lecturerRoutes);

module.exports = router;
