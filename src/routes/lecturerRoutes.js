const router = require('express').Router();
const lecturerController = require('../controllers/lecturerController');


router.get('/item/all', lecturerController.getAllLecturerItems);
router.get('/load/all', lecturerController.groupLecturerLoad);

module.exports = router;