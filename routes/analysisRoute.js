const analysisController = require("../controllers/analysisController");
const express = require("express");
const router = express.Router();

router.get(
  "/FilterStudentinGroup/:id",
  analysisController.FilterStudentinGroup
);
router.get("/yearWiseData", analysisController.yearWiseData);

module.exports = router;