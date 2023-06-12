const mongoose = require("mongoose");
let modelSchema = mongoose.Schema({
  title: String,
  amount: Number,
  isFixed: Boolean,
  maxAmount: Number,
});
let Voucher = mongoose.model("Voucher", modelSchema);
module.exports = Voucher;
