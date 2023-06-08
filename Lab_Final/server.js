const express = require("express");
let app = express();
let expressLayouts = require("express-ejs-layouts");

const dbUrl =
  "mongodb+srv://mibrahim37612:ibrahim123@cluster0.im6loid.mongodb.net/final";
let SugarLevel = require("./models/MyModel");

app.use(express.json());
app.use(express.urlencoded());
app.use(expressLayouts);

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  let records = await SugarLevel.find();
  let haveRecords = true;

  if (!records.length) haveRecords = false;

  res.render("homepage", { records, haveRecords });
});

app.get("/sugarlevel", (req, res) => {
  res.render("addSugarLevel");
});

app.post("/sugarlevel", async (req, res) => {
  let record = new SugarLevel(req.body);
  await record.save();

  res.redirect("/");
});

app.get("/deletesugarlevel/:id", async (req, res) => {
  let id = req.params.id;

  await SugarLevel.findByIdAndDelete(id);

  res.redirect("/");
});

app.listen(4000, () => {
  console.log("Server Started");
});

const mongoose = require("mongoose");
mongoose
  .connect(dbUrl, { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo ...."))
  .catch((error) => console.log(error.message));
