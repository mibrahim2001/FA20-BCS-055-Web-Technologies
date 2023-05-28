const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: Math.floor(Math.random() * 9000) + 1000,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
