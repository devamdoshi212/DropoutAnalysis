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
router.get("/mediumWise", analysisController.mediumWise);
router.get("/areaWise", analysisController.areaWise);
router.get("/stateWiseCount", analysisController.stateWiseCount);
router.get("/countryComparative", analysisController.countryComparative);
router.get("/top5State", analysisController.top5State);
router.get("/top5District", analysisController.top5District);
router.get("/top5Taluka", analysisController.top5Taluka);
router.get("/areaAndReasonWise", analysisController.areaAndReasonWise);
router.get("/DistrictWiseData", analysisController.DistrictWiseData);
router.get("/groupBySchool", analysisController.groupBySchool);
router.get("/reasonYearTrend", analysisController.reasonYearTrend);
router.get("/ReasonAndAreaWise", analysisController.ReasonAndAreaWise);

module.exports = router;
