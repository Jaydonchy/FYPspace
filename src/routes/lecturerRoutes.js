const router = require('express').Router();
const lecturerController = require('../controllers/lecturerController');

router.get('/supervisor/load', lecturerController.getAllSupervisoryLoad);
router.get('/marker/load', lecturerController.getAllMarkerLoad);

module.exports = router;