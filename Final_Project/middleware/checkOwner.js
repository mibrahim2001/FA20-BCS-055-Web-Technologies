const Server = require("../models/server");

async function checkSessionAuth(req, res, next) {
  try {
    const serverId = req.params.id;
    console.log("serverId", serverId);
    const server = await Server.findById(serverId);
    const userId = req.session.user._id;

    if (!(server.owner == userId)) {
      console.log("The user is not an owner");
      return res.status(401).send("Only owner can delete a server");
    }

    next();
  } catch (err) {
    res.status(500).send();
  }
}

module.exports = checkSessionAuth;
