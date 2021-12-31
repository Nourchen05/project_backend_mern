//1-import express module
const express = require("express");

//2-intance of express
const app = express();

//3-import dot env
require("dotenv").config();

//6-Middlware parser
app.use(express.json());

//5-connect to DB
const connectDB = require("./config/connectDB");
connectDB();

//6-routes
app.use("/api/contacts", require("./routes/contact"));

//4-PORT and create server
const PORT = process.env.PORT;
app.listen(PORT, (err) => {
  err
    ? console.error("error", error)
    : console.log(`Server is running on port ${PORT}`);
});
