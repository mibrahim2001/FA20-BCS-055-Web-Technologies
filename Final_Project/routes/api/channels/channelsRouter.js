const express = require("express");
const router = express.Router();
const checkSessionAuth = require("../../../middleware/checkSessionAuth");
const Server = require("../../../models/server");

router.get("/channels", checkSessionAuth, (req, res) => {
  const user = req.session.user;
  const servers = Server.find({ owner: user._id });
  res.render("channels/channels.ejs", { user, servers });
});

module.exports = router;
