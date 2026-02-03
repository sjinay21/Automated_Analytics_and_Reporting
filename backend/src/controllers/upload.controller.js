const analyticsService = require("../services/analytics.service");

exports.uploadDataset = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded. Please upload a CSV or Excel file.",
      });
    }
    if (req.file.size === 0) {
      return res.status(400).json({
        success: false,
        message: "Uploaded file is empty.",
      });
    }
    const analyticsResult = await analyticsService.runAnalytics(
      req.file.path
    );
    return res.status(200).json({
      success: true,
      message: "File uploaded and analyzed successfully",
      analytics: analyticsResult,
    });
  } catch (error) {
    let responseMessage = "Unable to analyze the uploaded dataset.";

    if (error.message === "Dataset is empty") {
      responseMessage = "Uploaded file is empty.";
    }

    if (error.message === "No numeric columns found for analysis") {
      responseMessage = "Dataset has no numeric columns to analyze.";
    }

    return res.status(400).json({
      success: false,
      message: responseMessage,
    });
  }
};

