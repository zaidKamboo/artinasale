require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const app = express();

connectDB()
  .then(() => {
    app
      .use(
        cors({
          origin: ["http://localhost:5173", "http://localhost:5174"],
          credentials: true,
        })
      )
      .use(cookieParser())
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use("/api/auth", authRoutes)
      .use("/api/profile", profileRoutes)
      .listen(PORT, () =>
        console.log(`🚀 Server is listening on http://localhost:${PORT}`)
      );
  })
  .catch((err) => {
    console.log("Error connecting to db", err);
  });
