const express = require("express");
let app = express();
const cors = require("cors");
const voucherRouter = require("./routes/api/voucherRouter");

const dbUrl =
  "mongodb+srv://mibrahim37612:ibrahim123@cluster0.im6loid.mongodb.net/final";

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use("/", voucherRouter);

app.listen(4000, () => {
  console.log("Server Started");
});

const mongoose = require("mongoose");
mongoose
  .connect(dbUrl, { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo ...."))
  .catch((error) => console.log(error.message));
