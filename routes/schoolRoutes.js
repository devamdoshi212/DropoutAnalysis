const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/schoolController");

router.get("/getSchool", schoolController.getSchool);
router.post("/addSchool", schoolController.addSchool);

router.get("/getSchoolType", schoolController.getSchoolType);
router.post("/addSchoolType", schoolController.addSchoolType);

module.exports = router;
