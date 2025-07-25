const multer = require("multer");
const {
  uploadAvatarConfig,
  uploadArtisanConfig,
  uploadProductConfig,
} = require("../config/multer");

/**
 * A reusable middleware generator for handling file uploads with detailed error handling.
 * @param {object} uploadConfig - The multer configuration object (e.g., uploadAvatarConfig).
 * @param {string} fieldName - The name of the field in the form-data that contains the file (e.g., 'avatar').
 * @returns {function} - An Express middleware function.
 */
const createUploadMiddleware =
  (uploadConfig, fieldName) => (req, res, next) => {
    const upload = uploadConfig.single(fieldName);

    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        console.error(`Multer error while uploading [${fieldName}]:`, err);
        switch (err.code) {
          case "LIMIT_FILE_SIZE":
            return res
              .status(400)
              .json({ message: `File is too large. Maximum size is allowed.` });
          case "LIMIT_FILE_COUNT":
            return res
              .status(400)
              .json({ message: "Too many files uploaded." });
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

      console.log(
        `[${fieldName}] upload successful`,
        req.file
          ? { filename: req.file.filename, path: req.file.path }
          : "No file uploaded"
      );
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
const uploadProductMiddleware = createUploadMiddleware(
  uploadProductConfig,
  "productImage"
);

module.exports = {
  uploadAvatarMiddleware,
  uploadArtisanMiddleware,
  uploadProductMiddleware,
};
