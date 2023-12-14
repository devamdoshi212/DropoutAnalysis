const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/StudentController");

router.get("/getStudent", StudentController.getStudents);

module.exports = router;
