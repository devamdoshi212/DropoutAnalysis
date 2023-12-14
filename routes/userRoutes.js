const express = require("express");
const router = express.Router();
const UserController = require('../Controllers/userController')
const DecodedToken = require('../Controllers/DecodeToken')


router.post('/signup',UserController.signup)
router.post('/login',UserController.login)
router.post('/verify',DecodedToken.decodedToken)

module.exports = router;
