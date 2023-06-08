const express = require("express");
const router = express.Router();
const Server = require("../../../models/server");
const User = require("../../../models/user");
const sessionAuth = require("../../../middleware/checkSessionAuth");

router.post("/server", sessionAuth, async (req, res) => {
  console.log("server post");
  const { name, type } = req.body;
  const owner = req.session.user._id;

  console.log("owner", owner, "name", name, "type", type);

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

    // res.status(201).send(server);
    res.redirect("/channels");
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

router.delete("/server/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const owner = req.session.user._id;
    const server = await Server.findOneAndDelete({
      _id: id,
      owner: owner,
    });

    if (!server) {
      res.status(404).send();
    }

    res.send(server);
  } catch (e) {
    res.status(500).send();
  }
});

router.put("/servers/:id", async (req, res) => {
  const serverId = req.params.id;

  try {
    const server = await Server.findById(serverId);

    if (!server) {
      return res.status(404).json({ message: "Server not found" });
    }

    server.name = req.body.name || server.name;
    server.owner = req.body.owner || server.owner;
    server.type = req.body.type || server.type;

    const updatedServer = await server.save();
    res.json(updatedServer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server update failed" });
  }
});

module.exports = router;
