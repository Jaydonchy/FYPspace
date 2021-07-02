const router = require('express').Router();
const studentController = require('../controllers/studentController');


router.get("/list",studentController.getStudentList);
router.get("/courses", studentController.getAllCourses);
router.get("/intakes", studentController.getAllIntakes);
router.get("/study_level", studentController.getAllStudyLevels);
router.get('/item/all',studentController.getAllStudentItems);

router.route("/register")
    .post(studentController.registerNewStudent);

module.exports = router;