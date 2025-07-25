const express = require("express");
const { submitContactForm } = require("../controllers/contact.controller");
const { isAuthenticatedUser } = require("../middlewares/auth.middleware");

const router = express.Router();

router.route("/").post(isAuthenticatedUser, submitContactForm);

module.exports = router;
