const express = require("express");
const { addReason } = require("../controllers/reasonController");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./public/resources",
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, Date.now() + "." + file.mimetype.split("/")[1]);
  },
});
const upload = multer({ storage: storage, limits: { fileSize: 15000000 } });

router.post("/addReason", upload.array("resources"), addReason);
module.exports = router;
