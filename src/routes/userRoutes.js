const router = require('express').Router();
//Require Controller
const userController = require("../controllers/userController");
const authController = require("../controllers/authController")
//Routes
router.get('/schools', userController.getAllSchools)
router.get('/school/:id', userController.getSchoolById)
router.get('/campus', userController.getAllCampus)
router.post('/login', authController.loginUser)
router.post('/login/refresh', authController.refreshSession)
router.post('/getPassword', authController.getPassword)

module.exports = router;