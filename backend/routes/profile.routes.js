const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/user.controller");
const { isAuthenticatedUser } = require("../middlewares/auth.middleware");
const { uploadAvatarMiddleware } = require("../middlewares/multer.middleware");

const router = require("express").Router();

router
  .route("/me")
  .get(isAuthenticatedUser, getUserProfile)
    .put( isAuthenticatedUser, uploadAvatarMiddleware, updateUserProfile );

module.exports = router;
