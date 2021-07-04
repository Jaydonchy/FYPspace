const router = require('express').Router();
const assignmentController = require('../controllers/assignmentController');

router.post('/update', assignmentController.assignLecturer);


module.exports = router;