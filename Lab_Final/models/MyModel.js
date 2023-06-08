const mongoose = require("mongoose");
let modelSchema = mongoose.Schema({
  reading: String,
  mood: String,
  type: String,
});
let Model = mongoose.model("SugarLevel", modelSchema);
module.exports = Model;
