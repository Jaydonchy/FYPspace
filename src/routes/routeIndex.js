const express = require('express');
const router = express.Router();



const userRoutes = require("./userRoutes");
const studentRoutes = require("./studentRoutes");
const lecturerRoutes = require("./lecturerRoutes");
const assignmentRoutes = require("./assignmentRoutes");
const questionRoutes = require('./questionRoutes');

router.use('/user', userRoutes);
router.use('/student', studentRoutes);
router.use('/lecturer', lecturerRoutes);
router.use('/assignment', assignmentRoutes);
router.use('/question', questionRoutes);

module.exports = router;
