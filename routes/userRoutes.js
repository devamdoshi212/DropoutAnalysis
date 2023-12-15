const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const DecodedToken = require("../controllers/DecodeToken");

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.post("/verify", DecodedToken.decodedToken);

module.exports = router;
