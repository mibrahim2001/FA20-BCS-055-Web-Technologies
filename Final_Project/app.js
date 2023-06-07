const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const authRouter = require("./routes/api/auth/authRouter");
const config = require("config");
const session = require("express-session");
const MongoStore = require("connect-mongo");
let connectionString = config.get("db");
// let expressLayouts = require("express-ejs-layouts");
let app = express();

//middleware
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: connectionString }),
    cookie: {
      user: { name: "hi" },
      maxAge: 1000 * 60 * 60 * 60 * 24, //equals one day
    },
  })
);

app.get("/", (req, res) => {
  res.render("index");
});

// Set up the routes
app.use("/", authRouter);

//start the server
let port = 4000;
app.listen(port, () => {
  //this is a call back function which will be executed when the express app started listening
  console.log(`App Listening on localhost:` + port);
});

app.get("/channels", (req, res) => {
  res.render("channels");
});

//connect to the database
// let connectionString =
//   "mongodb+srv://mibrahim37612:ibrahim123@cluster0.im6loid.mongodb.net/discord";

const clientPromise = mongoose
  .connect(connectionString)
  .then(() => {
    console.log("connected: " + connectionString);
  })
  .catch(() => {
    console.log("unable to connect");
  });

console.log("client promise", clientPromise);
//session handling
