const express = require("express");
const router = express.Router();
const Server = require("../../../models/server");
const User = require("../../../models/user");
const sessionAuth = require("../../../middleware/checkSessionAuth");

router.post("/server", async (req, res) => {
  console.log("server post");
  const { name, type } = req.body;
  const users = await User.find();
  const owner = users[0]._id;

  if (!(name && owner && type)) {
    return res.status(400).send("Please fill all fields");
  }

  try {
    const server = new Server({
      name,
      owner,
      type,
    });

    await server.save();

    res.status(201).send(server);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/server", async (req, res) => {
  try {
    const servers = await Server.find({ owner: req.user._id });

    if (servers.length > 0) {
      res.send(servers);
    } else {
      res.send("No servers found");
    }
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
