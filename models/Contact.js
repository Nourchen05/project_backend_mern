//require mongoose
const mongoose = require("mongoose");

//import Schema
const { Schema } = mongoose;

//create contactSChema
const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: Number,
});

module.exports = Contact = mongoose.model("contact", contactSchema);
