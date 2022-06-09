const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bookController = {
  homePage: async (req, res) => {
    const sessionAuth = req.session.isAuth;
    const booksCount = await prisma.Book.count();
    const skip = Math.floor(Math.random() * booksCount);
    const books = await prisma.Book.findMany({
      take: 4,
      skip: skip,
      orderBy: {
        id: "desc",
      },
    });
    res.render("homepage", { books, sessionAuth });
  },
  bookPage: async (req, res) => {
    const { title } = req.params;
    req.params.book_id = parseInt(req.params.book_id);
    const { book_id } = req.params;

    try {
      const username = req.session.username;
      const sessionAuth = req.session.isAuth;

      const books = await prisma.Book.findMany({
        where: { book_id: book_id, title: title },
      });
      const reviews = await prisma.reviews.findMany({
        where: { book_id: book_id },
      });
      const avgStars = await prisma.reviews.aggregate({
        _avg: { stars: true },
        where: {
          book_id: book_id,
        },
      });
      const bookGenre = await prisma.Book.findMany({
        where: { book_id: book_id },
        select: {
          genres: true,
          tag: true,
        },
      });
      const genre = bookGenre[0].genres;
      const oneTag = bookGenre[0].tag;
      const items = genre.splice(1, 3);

      const recs = await prisma.Book.findMany({
        where: {
          genres: {
            hasEvery: items,
          },
          tag: {
            hasSome: oneTag,
          },
        },
        take: 25,
      });
      recs.sort(function (a, b) {
        return 0.5 - Math.random();
      });
      res.render("bookPage", {
        books,
        title,
        reviews,
        recs,
        book_id,
        username,
        sessionAuth,
        avgStars,
      });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = bookController;
