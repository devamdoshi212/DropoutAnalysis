const authorityController = require('../controllers/authorityController')
const express = require("express");
const router = express.Router();

router.get('/authoritycount',authorityController.dashboardCount)

module.exports = router;