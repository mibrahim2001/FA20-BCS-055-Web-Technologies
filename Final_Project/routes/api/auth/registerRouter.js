const express = require("express");
const router = express.Router();
const User = require("../../../models/user");

router.get("/", (req, res) => {
  console.log("register get");
  res.render("auth/auth_layout", { content: "./register" });
});

router.post("/", async (req, res) => {
  const { email, username, password, month, day, year } = req.body;

  const dateOfBirth = new Date(`${year}-${month}-${day}`);

  const user = new User({
    email,
    username,
    password,
    dateOfBirth,
  });

  try {
    await user.save();
    console.log("user saved");
    res.status(201).redirect("/login");
  } catch (e) {
    console.log("user not saved");
    res.status(400).send(e);
  }
});

module.exports = router;
