const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/studentController");

router.get("/getStudent", StudentController.getStudents);
router.post("/addStudent", StudentController.addStudents);
router.patch("/deactivateStudent", StudentController.deactivateStudent);
router.patch("/promteStudent", StudentController.promoteStudent);

module.exports = router;
