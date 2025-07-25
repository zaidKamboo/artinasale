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
  const { name, description, price, category, stock, details, artisan } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Optional: Check if the user is authorized to update this product
  // if (product.user.toString() !== req.user._id.toString()) {
  //   res.status(401);
  //   throw new Error("User not authorized");
  // }

  product.name = name || product.name;
  product.description = description || product.description;
  product.price = price || product.price;
  product.category = category || product.category;
  product.stock = stock || product.stock;
  product.details = details ? JSON.parse(details) : product.details;
  product.artisan = artisan ? JSON.parse(artisan) : product.artisan;

  // Handle image updates if new files are uploaded
  if (req.files && req.files.length > 0) {
    // You might want more sophisticated logic here, like deleting old images
    // or allowing specific images to be replaced.
    const newImages = req.files.map((file) => ({
      public_id: file.filename,
      url: file.path,
    }));
    product.images = newImages;
  }

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (for admins/sellers)
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    // Delete all images from Cloudinary associated with the product
    for (const image of product.images) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    await product.remove();
    res.json({ message: "Product removed successfully" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
    