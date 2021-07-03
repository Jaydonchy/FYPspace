const router = require('express').Router();
const lecturerController = require('../controllers/lecturerController');


router.get('/item/all', lecturerController.getAllLecturerItems);
router.get('/departments', lecturerController.getAllDepartment);
router.get('/locations', lecturerController.getAllLocation);
router.get('/positions', lecturerController.getAllPosition);

module.exports = router;