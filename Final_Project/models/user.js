const { v4: uuidv4 } = require("uuid");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
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

userSchema.methods.generateEncryptedPassword = async function () {
  let encryptedPassword = await bcrypt.hash(this.password, 10);
  this.password = encryptedPassword;
};

userSchema.methods.generateUserId = function () {
  const randomNumber = Math.floor(Math.random() * 9000) + 1000;
  this.userId = randomNumber.toString();
};

const User = mongoose.model("User", userSchema);
module.exports = User;
