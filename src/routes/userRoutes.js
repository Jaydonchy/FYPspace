const router = require('express').Router();
//Require Controller
const userController = require("../controllers/userController");

//Routes
router.get('/schools',userController.getAllSchools)
router.get('/school/:id',userController.getSchoolById)
router.get('/campus',userController.getAllCampus)
router.post('/login',userController.login)


module.exports= router;