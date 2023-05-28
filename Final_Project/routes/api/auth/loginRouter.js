const express = require("express");
const router = express.Router();
const User = require("../../../models/user");

router.get("/login", (req, res) => {
  res.render("auth/auth_layout", { content: "./login" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      console.log(user);
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
