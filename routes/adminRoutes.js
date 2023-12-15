const adminController = require('../controllers/adminController');
const express = require("express");
const router = express.Router();

router.get("/AdmindashboardCount", adminController.dashboardCount);

module.exports = router;
