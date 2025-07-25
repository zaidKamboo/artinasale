require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const profileRoutes = require("./routes/profile.routes");
const productRoutes = require("./routes/product.routes");
const contactRoutes = require("./routes/contact.routes");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://artinasale.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg =
        "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
};

connectDB()
  .then(() => {
    app
      .use(cors(corsOptions))
      .use(cookieParser())
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use("/api/auth", authRoutes)
      .use("/api/profile", profileRoutes)
      .use("/api/products", productRoutes)
      .use("/api/contact", contactRoutes)
      .listen(PORT, () =>
        console.log(`🚀 Server is listening on http://localhost:${PORT}`)
      );
  })
  .catch((err) => console.log("Error connecting to db", err));
