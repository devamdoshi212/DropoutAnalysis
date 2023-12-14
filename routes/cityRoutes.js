const express = require("express");
const router = express.Router();
const cityController=require("../controllers/cityController")


router.get("/getCities",cityController.getCities)

module.exports = router;
