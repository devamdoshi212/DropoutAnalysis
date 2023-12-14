const express = require("express");
const router = express.Router();
const cityController = require("../controllers/cityController");

router.post("/addCities", cityController.addCities);
router.get("/getCities", cityController.getCities);

router.post("/addState", cityController.addStates);
router.get("/getStates", cityController.getStates);

router.post("/addDistricts", cityController.addDistricts);
router.get("/getDistricts", cityController.getDistricts);

router.post("/addTalukas", cityController.addTalukas);
router.get("/getTalukas", cityController.getTalukas);

module.exports = router;
