const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Connect to the MongoDB database
    // await mongoose.connect('mongodb://mongodb:27017/bunda_mikel', { //deploymnet
    // await mongoose.connect('mongodb://database:27017/mydatabase', { //local
    await mongoose.connect(
      "mongodb://root:root@database-lw24-kelompok-5:27017/bunda_mikel",
      {
        connectTimeoutMS: 10000,
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};
module.exports = connectDB;
