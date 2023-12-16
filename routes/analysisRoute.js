const analysisController = require("../controllers/analysisController");
const express = require("express");
const router = express.Router();

router.get(
  "/FilterStudentinGroup/:id",
  analysisController.FilterStudentinGroup
);
router.get("/yearWiseData", analysisController.yearWiseData);
router.get(
  "/FilterStudentinGroupByTwo",
  analysisController.FilterStudentinGroupByTwo
);
router.get("/statewiseDropout", analysisController.statewiseDropout);
router.get("/GroupPopulateData", analysisController.GroupPopulateData);

module.exports = router;
