const multer = require("multer");
const {
  uploadAvatarConfig,
  uploadArtisanConfig,
  uploadProductConfig,
} = require("../config/multer");

const createUploadMiddleware =
  (uploadConfig, fieldName, options = { type: "single" }) =>
  (req, res, next) => {
    let upload;

    if (options.type === "array")
      upload = uploadConfig.array(fieldName, maxCount);
    else upload = uploadConfig.single(fieldName);

    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        console.error(`Multer error while uploading [${fieldName}]:`, err);
        switch (err.code) {
          case "LIMIT_FILE_SIZE":
            return res
              .status(400)
              .json({ message: `File is too large. Maximum size is allowed.` });
          case "LIMIT_FILE_COUNT":
            return res.status(400).json({
              message: `Too many files uploaded. Max count is ${
                options.maxCount || 1
              }.`,
            });
          case "LIMIT_UNEXPECTED_FILE":
            return res.status(400).json({
              message: `Unexpected field: ${err.field}. Please use '${fieldName}'.`,
            });
          default:
            return res
              .status(400)
              .json({ message: `File upload error: ${err.message}` });
        }
      } else if (err) {
        console.error(`Unknown error while uploading [${fieldName}]:`, err);
        return res.status(500).json({
          message: `An unknown error occurred during file upload: ${err.message}`,
        });
      }

      const filesInfo = req.files
        ? req.files.map((f) => ({ filename: f.filename, path: f.path }))
        : req.file
        ? { filename: req.file.filename, path: req.file.path }
        : "No file(s) uploaded";
      console.log(`[${fieldName}] upload successful`, filesInfo);
      next();
    });
  };

const uploadAvatarMiddleware = createUploadMiddleware(
  uploadAvatarConfig,
  "avatar"
);

const uploadArtisanMiddleware = createUploadMiddleware(
  uploadArtisanConfig,
  "artisanImage"
);

const uploadProductImagesMiddleware = createUploadMiddleware(
  uploadProductConfig,
  "productImages",
  { type: "array", maxCount: 10 }
);

module.exports = {
  uploadAvatarMiddleware,
  uploadArtisanMiddleware,
  uploadProductImagesMiddleware,
};
