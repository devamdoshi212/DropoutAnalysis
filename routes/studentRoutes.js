const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/studentController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/getStudent", StudentController.getStudents);
router.post("/addStudent", StudentController.addStudents);
router.patch("/deactivateStudent", StudentController.deactivateStudent);
router.patch("/promteStudent", StudentController.promoteStudent);

//add student from excel sheet
router.post(
  "/addStudentExcel",
  upload.single("excelfile"),
  StudentController.addStudentsFromExcel
);

module.exports = router;
