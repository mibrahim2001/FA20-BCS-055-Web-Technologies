const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/book");
var expressLayouts = require("express-ejs-layouts");
let app = express();
// app.use(expressLayouts);
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

app.use("/api/books", require("./routes/api/books/booksRouter"));
app.use("/api/toys", require("./routes/api/toys/toysRouter"));
app.use("/", require("./routes/books"));

app.get("/login", (req, res) => {
  res.render("auth/auth_layout", { content: "./login" });
});

app.get("/register", (req, res) => {
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

let connectionString = "mongodb://localhost/fa20-b-bookstore";
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("connected: " + connectionString);
  })
  .catch(() => {
    console.log("unable to connect");
  });
