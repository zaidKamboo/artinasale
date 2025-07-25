const router = require("express").Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getUserProducts,
} = require("../controllers/product.controller");
const { isAuthenticatedUser } = require("../middlewares/auth.middleware");
const {
  uploadProductImagesMiddleware,
} = require("../middlewares/multer.middleware");

router.route("/").get(getAllProducts);
router.route("/:id").get(getProductById);

router
  .route("/user-products/:userId")
  .get(isAuthenticatedUser, getUserProducts);

router
  .route("/create")
  .post(isAuthenticatedUser, uploadProductImagesMiddleware, createProduct);
router
  .route("/:id")
  .put(isAuthenticatedUser, uploadProductImagesMiddleware, updateProduct);
router.route("/:id").delete(isAuthenticatedUser, deleteProduct);

module.exports = router;
