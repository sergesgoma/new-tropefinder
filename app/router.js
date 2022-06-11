const express = require("express");
const router = express.Router();

// import of middlewares
const { isAuth } = require("./middlewares/");

// import of controllers
const bookController = require("./controllers/bookController");
const authController = require("./controllers/authController");
const tagController = require("./controllers/tagController");
const reviewController = require("./controllers/reviewController");

// HOMEPAGE
router.get("/", bookController.homePage);

// SEARCH ENGINE
router.get("/tag", tagController.tagPage);
router.get('/search',tagController.searchEngine);

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

// CRUD REVIEW PAGES
router.get("/book/:book_id/:title/write-review",isAuth,reviewController.addReviewPage);
router.post("/book/:book_id/:title/", reviewController.addReview);
router.get("/book/:book_id/:title/:review_id/edit-review", isAuth, reviewController.editReviewPage);
router.post("/book/:book_id/:title/:review_id/edit-review", reviewController.editReview);
router.get("/book/:book_id/:title/:review_id/delete-review", reviewController.deleteReview);

// WISHLIST PAGES
router.get("/wishlist", isAuth, bookController.wishlistPage);
router.get("/wishlist/:book_id", isAuth, bookController.addWishlistPage);
router.post("/wishlist/:book_id", isAuth, bookController.addWishlist);
router.get("/wishlist/:book_id/delete", bookController.deleteWishlist);

// TROPE LIST
router.get("/all-tropes", tagController.tropeList);

module.exports = router;
