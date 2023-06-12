const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user");
const authRouter = require("./routes/api/auth/authRouter");
const serverRouter = require("./routes/api/server/serverRouter");
const channelsRouter = require("./routes/api/channels/channelsRouter");
const config = require("config");
const session = require("express-session");
const MongoStore = require("connect-mongo");
let connectionString = config.get("db");
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
      maxAge: 1000 * 60 * 60 * 60 * 24, //equals one day
    },
  })
);

// home route
app.get("/", (req, res) => {
  res.render("index");
});

// Set up the routes
app.use("/", authRouter);
app.use("/", serverRouter);
app.use("/", channelsRouter);

//start the server
let port = 4000;
app.listen(port, () => {
  console.log(`App Listening on localhost:` + port);
});

//connect to database
const clientPromise = mongoose
  .connect(connectionString)
  .then(() => {
    console.log("connected: " + connectionString);
  })
  .catch(() => {
    console.log("unable to connect");
  });
