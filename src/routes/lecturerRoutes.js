const router = require('express').Router();
const lecturerController = require('../controllers/lecturerController');


router.get('/item/all', lecturerController.getAllLecturerItems);
router.get('/departments', lecturerController.getAllDepartment);
router.get('/locations', lecturerController.getAllLocation);
router.get('/positions', lecturerController.getAllPosition);
router.get('/simple/:id', lecturerController.getLecturerNameById);
router.post('/profile/edit',lecturerController.updateLecturerProfile);
router.get('/workload/:lecturer_id',lecturerController.getLecturerWorkLoad);
router.get('/meetings/:lecturer_id',lecturerController.getLecturerMeetingLogs);


module.exports = router;