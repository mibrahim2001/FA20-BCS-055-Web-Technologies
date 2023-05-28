const express = require("express");
const router = express.Router();
const User = require("../../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

router.get("/register", (req, res) => {
  console.log("register get");
  res.render("auth/auth_layout", { content: "./register" });
});

router.post("/register", async (req, res) => {
  const { email, username, password, month, day, year } = req.body;

  const dateOfBirth = new Date(`${year}-${month}-${day}`);

  if (!(email && username && password && month && day && year)) {
    return res.status(400).send("Please fill all fields");
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    let encryptedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      username,
      password: encryptedPassword,
      dateOfBirth,
    });

    await user.save();

    res.status(201).send(_.pick(user, ["_id", "email", "username", "userId"]));
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/login", (req, res) => {
  res.render("auth/auth_layout", { content: "./login" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found");
    }

    let isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).send("Invalid password");
    }

    res.status(200).send(_.pick(user, ["_id", "email", "username", "userId"]));
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;