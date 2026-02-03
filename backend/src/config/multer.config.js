const multer = require("multer");
const path = require("path");
const uploadPath = path.join(__dirname, "../../uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalName = file.originalname;
    const fileName = `${timestamp}-${originalName}`;

    cb(null, fileName);
  },
});
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "text/csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
    "application/octet-stream", 
  ];

  const allowedExtensions = [".csv", ".xlsx", ".xls"];
  const fileExtension = path.extname(file.originalname).toLowerCase();

  const isMimeTypeValid = allowedMimeTypes.includes(file.mimetype);
  const isExtensionValid = allowedExtensions.includes(fileExtension);

  if (isMimeTypeValid && isExtensionValid) {
    cb(null, true);
  } else {
    cb(new Error("Only CSV and Excel files are allowed"), false);
  }
};
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
