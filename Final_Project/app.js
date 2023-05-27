const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/book");
const User = require("./models/user");
var expressLayouts = require("express-ejs-layouts");
let app = express();
// app.use(expressLayouts);
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use("/api/books", require("./routes/api/books/booksRouter"));
app.use("/api/toys", require("./routes/api/toys/toysRouter"));
app.use("/", require("./routes/books"));

app.get("/login", (req, res) => {
  res.render("auth/auth_layout", { content: "./login" });
});

app.post("/register", async (req, res) => {
  const { email, username, password, month, day, year } = req.body;

  const dateOfBirth = new Date(`${year}-${month}-${day}`);

  const user = new User({
    email,
    username,
    password,
    dateOfBirth,
  });

  try {
    await user.save();
    console.log("user saved");
    res.status(201).redirect("/login");
  } catch (e) {
    console.log("user not saved");
    res.status(400).send(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      console.log(user);
      return res.status(404).send("User not found");
    }

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.get("/register", (req, res) => {
  console.log("register get");
  res.render("auth/auth_layout", { content: "./register" });
});

app.get("/contact-us", (req, res) => {
  //   res.send("Hello");
  res.render("contact-us");
});
app.get("/", (req, res) => {
  //   res.send("Hello");
  res.render("index");
});

let port = 3000;
app.listen(port, () => {
  //this is a call back function which will be executed when the express app started listening
  console.log(`App Listening on localhost:` + port);
});

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
