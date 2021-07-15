const router = require('express').Router();
const questionController = require('../controllers/questionController')

router.get('/lecturer/:lecturer_id',questionController.getLecturerQuestion);

module.exports = router;