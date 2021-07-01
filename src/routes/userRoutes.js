const router = require('express').Router();
//Require Controller
const userController = require("../controllers/userController");

//Routes
router.get('/schools',userController.selectAllSchools)
router.get('/campus',userController.selectAllCampus)
router.post('/login',userController.login)

module.exports= router;