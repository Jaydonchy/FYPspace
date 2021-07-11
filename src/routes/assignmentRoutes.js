const router = require('express').Router();
const assignmentController = require('../controllers/assignmentController');

router.post('/update', assignmentController.assignLecturer);
router.get('/view/:assignment_id', assignmentController.getAssignmentView)


module.exports = router;