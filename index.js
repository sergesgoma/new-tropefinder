// creation of the express server
const express = require("express");
const router = require("./app/router");
const session = require("express-session");
const path = require("path");
const PORT = process.env.PORT || 5000;
require("dotenv").config({ path: "./.env" });

const app = express();

// connect DB
// const db = require('./app/database/db');
// db.authenticate()
//   .then(() => console.log("Database connected..."))
//   .catch((err) => console.log("Error:" + err));



// definition of the view engine + views path
app.set("view engine", "ejs");
app.set("views", [
  path.join(__dirname, "./app/views"),
  path.join(__dirname, "./app/views/main"),
  path.join(__dirname, "./app/views/auth"),
  path.join(__dirname, "./app/views/tags"),
  path.join(__dirname, "./app/views/books")
]);

// static file path
app.use(express.static(path.join(__dirname, "/public")));

// extraction of the form data + addition of the req.body proprieties
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// launch of the server + listening
app.use(router);
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
