const router = require('express').Router();
const studentController = require('../controllers/studentController');

router.get("/courses", studentController.selectAllCourses);
router.get("/intakes", studentController.selectAllIntakes);
router.get("/study_level", studentController.selectAllStudyLevels);

router.route("/register")
    .post(studentController.registerNewStudent);

module.exports = router;