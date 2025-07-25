const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const createCloudinaryStorage = (folderName) => {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `artisanale/${folderName}`,
      format: async (_, file) => {
        const formats = ["jpg", "jpeg", "png", "gif", "webp"];
        const mimeType = file.mimetype.split("/")[1];
        return formats.includes(mimeType) ? mimeType : "jpg";
      },
      public_id: (_, file) => `${Date.now()}_${file.originalname}`,
    },
  });
};

const avatarStorage = createCloudinaryStorage("avatars");
const productStorage = createCloudinaryStorage("products");
const artisanStorage = createCloudinaryStorage("artisans");

module.exports = {
  uploadAvatarConfig: multer({ storage: avatarStorage }),
  uploadProductConfig: multer({ storage: productStorage }),
  uploadArtisanConfig: multer({ storage: artisanStorage }),
};
