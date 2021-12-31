//import mongoose
const mongoose = require("mongoose");

//async function for connecting to DB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Server is succsessfully connected to DB !!");
  } catch (error) {
    console.error("Can not connect to database !! Error ", error);
  }
};

module.exports = connectDB;
