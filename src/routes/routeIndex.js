const express = require('express');
const router = express.Router();



const userRoutes = require("./userRoutes");
const studentRoutes = require("./studentRoutes");
const lecturerRoutes = require("./lecturerRoutes");
const assignmentRoutes = require("./assignmentRoutes");

router.use('/user',userRoutes);
router.use('/student',studentRoutes);
router.use('/lecturer',lecturerRoutes);
router.use('/assignment',assignmentRoutes);

module.exports = router;
