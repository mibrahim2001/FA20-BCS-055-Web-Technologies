const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const authRouter = require("./routes/api/auth/authRouter");

// let expressLayouts = require("express-ejs-layouts");
let app = express();

//middleware
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("index");
});

// Set up the routes
app.use("/", authRouter);

//start the server
let port = 3000;
app.listen(port, () => {
  //this is a call back function which will be executed when the express app started listening
  console.log(`App Listening on localhost:` + port);
});

//connect to the database
let connectionString =
  "mongodb+srv://mibrahim37612:ibrahim123@cluster0.im6loid.mongodb.net/discord";
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("connected: " + connectionString);
  })
  .catch(() => {
    console.log("unable to connect");
  });
