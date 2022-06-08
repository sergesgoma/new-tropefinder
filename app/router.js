const express = require("express");
const router = express.Router();

// import of middlewares
const { isAuth } = require("./middlewares/");

// import of controllers
const bookController = require("./controllers/bookController");
const authController = require("./controllers/authController");
const tagController = require("./controllers/tagController");

// HOMEPAGE
router.get("/", bookController.homePage);

// SEARCH ENGINE
router.get("/tag", tagController.tagPage);

// TAG, AUTHOR, GENRE, SERIES PAGES
router.get("/tags/:tag", tagController.tagsPage);
router.get("/author/:author", tagController.authorPage);
router.get("/genre/:genre", tagController.genrePage);
router.get("/series/:series", tagController.seriesPage);

// BOOK PAGE
router.get("/book/:book_id/:title", bookController.bookPage);

// LOGIN PAGES
router.get("/login", authController.loginPage);
router.post("/login", authController.logIn);

// LOGOUT
router.post("/logout", authController.logOut);

// SIGNUP PAGES
router.get("/signup", authController.signupPage);
router.post("/signup", authController.signUp);



module.exports = router;
