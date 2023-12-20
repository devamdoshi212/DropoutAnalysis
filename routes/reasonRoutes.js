const express = require("express");
const reasonController = require("../controllers/reasonController");
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

router.get("/getReason", reasonController.getReason);

router.post(
  "/addReason",
  upload.array("resources"),
  reasonController.addReason
);
router.patch(
  "/addResource",
  upload.fields([
    { name: "pdf", maxCount: 10 },
    { name: "video", maxCount: 10 },
    { name: "pptx", maxCount: 10 },
  ]),
  reasonController.addResource
);

router.get("/customeSearch", reasonController.customeSearch);
module.exports = router;
