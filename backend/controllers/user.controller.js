const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");
const cloudinary = require("../config/cloudinary");

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    username,
    email,
    password,
  });

  if (req.file) {
    user.avatar = {
      public_id: req.file.filename,
      url: req.file.path,
    };
    await user.save();
  }

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (user && (await user.comparePassword(password, user.password))) {
    generateToken(res, user._id);
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Logout user / clear cookie
// @route   GET /api/users/logout
// @access  Public
const logoutUser = (_, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Update text fields
    user.name = req.body.name || user.name;
    user.username = req.body.username || user.username;
    user.bio = req.body.bio || user.bio;

    // Handle avatar update
    if (req.file) {
      // Check if an old avatar exists and has a public_id
      if (user.avatar && user.avatar.public_id) {
        // If so, delete the old avatar from Cloudinary
        try {
          await cloudinary.uploader.destroy(user.avatar.public_id);
          console.log("DELTE");
        } catch (error) {
          console.error("Error deleting old avatar from Cloudinary:", error);
          // Decide if you want to proceed even if deletion fails.
          // For this example, we'll proceed but log the error.
        }
      }

      // Set the new avatar's details
      user.avatar = {
        public_id: req.file.filename, // This should be the public_id from multer-storage-cloudinary
        url: req.file.path,
      };
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      username: updatedUser.username,
      email: updatedUser.email,
      avatar: updatedUser.avatar,
      bio: updatedUser.bio,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  logoutUser,
};
