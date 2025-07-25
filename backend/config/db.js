const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.error("❌ ERROR: MONGO_URI is not defined in your .env file");
      process.exit(1);
    }
    mongoose
      .connect(mongoURI)
      .then((res) =>
        console.log(`🍃 MongoDB Connected: ${res.connection.host}`)
      )
      .catch((error) => {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
      });
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
  }
};

module.exports = connectDB;
