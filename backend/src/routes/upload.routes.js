const express = require("express");
const upload = require("../config/multer.config");
const uploadController = require("../controllers/upload.controller");

const router = express.Router();

router.post("/upload", (req, res, next) => {
  upload.single("dataset")(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type. Please upload a CSV or Excel file.",
      });
    }
    next();
  });
}, uploadController.uploadDataset);

module.exports = router;
