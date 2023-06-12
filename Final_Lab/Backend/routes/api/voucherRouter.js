const express = require("express");
const router = express.Router();
const Voucher = require("../../models/voucher");

router.get("/voucher", async (req, res) => {
  let records = await Voucher.find();
  let haveRecords = records.length > 0;
  if (haveRecords) {
    console.log("Records found");
    res.status(200).json(records);
  } else {
    res.status(400).send("No records found");
  }
});

router.post("/voucher", async (req, res) => {
  let { title, amount, isFixed, maxAmount } = new Voucher(req.body);
  if (!(title && amount && isFixed != undefined && maxAmount)) {
    return res.status(400).send("Please provide all the fields");
  }

  try {
    const existingVoucher = await Voucher.findOne({ title });
    if (existingVoucher) {
      return res.status(400).send("Voucher already exists");
    }
    const voucher = new Voucher({
      title,
      amount,
      isFixed,
      maxAmount,
    });
    await voucher.save();
    res.status(200).send(voucher);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put("/voucher/:id", async (req, res) => {
  let id = req.params.id;
  let voucher = await Voucher.findById(id);
  if (!voucher) {
    return res.status(404).send("Voucher not found.");
  }
  Object.assign(voucher, req.body);
  await voucher.save();
  res.status(200).json(voucher);
});

router.delete("/voucher/:id", async (req, res, next) => {
  const voucherId = req.params.id;
  try {
    const voucher = await Voucher.findByIdAndDelete(voucherId);
    if (!voucher) {
      return res.status(404).send("Voucher not found.");
    }
    res.status(204).send("Voucher deleted successfully.");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
