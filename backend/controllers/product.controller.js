const asyncHandler = require("express-async-handler");
const Product = require("../models/product.model");
const cloudinary = require("cloudinary").v2;

// @desc    Create a new product
// @route   POST /api/products
// @access  Private (for admins/sellers)
const createProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category, stock, details, artisan } =
    req.body;

  if (!req.files || req.files.length === 0) {
    res.status(400);
    throw new Error("No product images uploaded.");
  }

  const images = req.files.map((file) => ({
    public_id: file.filename,
    url: file.path,
  }));

  const product = new Product({
    user: req.user._id, // From isAuthenticatedUser middleware
    name,
    description,
    price,
    category,
    stock,
    images,
    details: JSON.parse(details), // Assuming details and artisan are stringified JSON
    artisan: JSON.parse(artisan),
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (for admins/sellers)
const updateProduct = asyncHandler(async (req, res) => {
  const { id: productId } = req.params;
  console.log(productId);
  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized to update this product");
  }

  if (req.body.name) product.name = req.body.name;
  if (req.body.description) product.description = req.body.description;
  if (req.body.price) product.price = req.body.price;
  if (req.body.category) product.category = req.body.category;
  if (req.body.stock) product.stock = req.body.stock;
  if (req.body.details) product.details = JSON.parse(req.body.details);
  if (req.body.artisan) product.artisan = JSON.parse(req.body.artisan);

  let finalImages = [];

  if (req.body.existingImages) {
    finalImages = JSON.parse(req.body.existingImages);
  }

  const originalImageIds = product.images.map((img) => img.public_id);
  const remainingImageIds = finalImages.map((img) => img.public_id);
  const imagesToDelete = originalImageIds.filter(
    (id) => !remainingImageIds.includes(id)
  );

  if (imagesToDelete.length > 0) {
    await Promise.all(
      imagesToDelete.map((publicId) => cloudinary.uploader.destroy(publicId))
    );
  }

  if (req.files && req.files.length > 0) {
    const newImages = req.files.map((file) => ({
      public_id: file.filename,
      url: file.path,
    }));
    finalImages.push(...newImages);
  }

  product.images = finalImages;

  const updatedProduct = await product.save();
  res.status(200).json(updatedProduct);
});
// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (for admins/sellers)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    for (const image of product.images)
      await cloudinary.uploader.destroy(image.public_id);

    await product.remove();
    res.json({ message: "Product removed successfully" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getUserProducts = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400);
    throw new Error("User ID not provided.");
  }

  const products = await Product.find({ user: userId });

  res.status(200).json(products);
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getUserProducts,
};
    