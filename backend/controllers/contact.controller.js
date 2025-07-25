const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact.model");

// @desc    Submit a contact form inquiry
// @route   POST /api/contact
// @access  Public
const submitContactForm = asyncHandler(async (req, res) => {
  const { name, email, subject, message } = req.body;
  const userId = req.user?._id || null;     

  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error("Please fill out all required fields.");
  }

  const inquiry = await Contact.create({
    name,
    email,
    subject,
    message,
    user: userId,
  });

  if (inquiry) {
    res.status(201).json({
      message: "Thank you for your message! We will get back to you shortly.",
    });
  } else {
    res.status(400);
    throw new Error("Invalid data provided.");
  }
});

module.exports = {
  submitContactForm,
};
