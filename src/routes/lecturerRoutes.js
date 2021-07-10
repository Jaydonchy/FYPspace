const router = require('express').Router();
const lecturerController = require('../controllers/lecturerController');


router.get('/item/all', lecturerController.getAllLecturerItems);
router.get('/departments', lecturerController.getAllDepartment);
router.get('/locations', lecturerController.getAllLocation);
router.get('/positions', lecturerController.getAllPosition);
router.get('/simple/:id', lecturerController.getLecturerNameById);
router.post('/profile/edit',lecturerController.updateLecturerProfile);


module.exports = router;