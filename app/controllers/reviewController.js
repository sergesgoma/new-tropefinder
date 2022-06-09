const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const reviewController = {
  addReviewPage: async (req, res) => {
    const { book_id, title } = req.params;
    const sessionAuth = req.session.isAuth;
    res.render("addReviewPage", { sessionAuth, title, book_id });
  },
  addReview: async (req, res) => {
    const { book_id, title } = req.params;
    const sessionAuth = req.session.isAuth;
    try {
      const { stars, review } = req.body;
      const { username, user_id } = req.session;

      const reviews = await prisma.Reviews.create({
        data: {
          stars: parseInt(stars),
          review: review,
          book_id: parseInt(book_id),
          user_id: user_id,
          username: username,
          updated: false,
        },
      });
      res.redirect("/book/" + book_id + "/" + title);
    } catch (err) {
      console.log(err);
      res.render("addReviewPage", { sessionAuth, title, book_id });
    }
  },
  editReviewPage: async (req, res) => {
    const { title, book_id, review_id } = req.params;
    const sessionAuth = req.session.isAuth;
    const reviews = await prisma.Reviews.findMany({
      where: { review_id: parseInt(review_id) },
    });
    res.render("editReviewPage", {
      sessionAuth,
      reviews,
      title,
      book_id,
      review_id,
    });
  },
  editReview: async (req, res) => {
    const { title, book_id, review_id } = req.params;

    try {
      const { review, stars } = req.body;

      const updateReview = await prisma.Reviews.update({
        where: { review_id: parseInt(review_id) },
        data: {
          review: review,
          stars: parseInt(stars),
          updated: true,
        },
      });

      res.redirect("/book/" + book_id + "/" + title);
    } catch (err) {
      console.log(err);
      res.render("error");
    }
  },
  deleteReview: async (req, res) => {
    const { title, book_id, review_id } = req.params;
    try {
      const deleteReview = await prisma.Reviews.delete({
      where: { review_id: parseInt(review_id) },
    });
    res.redirect("/book/" + book_id + "/" + title);
    }
    catch (err) {
      console.log(err);
      res.render("error");
    }
  },
};

module.exports = reviewController;
