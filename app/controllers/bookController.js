const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config({ path: "../../.env" });

const bookController = {
  homePage: async (req, res) => {
    const sessionAuth = req.session.isAuth;
    const booksCount = await prisma.books.count();
    const skip = Math.floor(Math.random() * booksCount);
    const books = await prisma.books.findMany({
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
    const username = req.session.username;
    const sessionAuth = req.session.isAuth;

    const books = await prisma.books.findMany({
      where: { AND: [{ book_id: book_id }, { title: title }] },
    });
    const bookGenre = await prisma.books.findMany({
      where: { book_id: book_id },
      select: {
        genres: true,
        tag: true,
      },
    });
    const genre = bookGenre[0].genres;
    const oneTag = bookGenre[0].tag;
    const size = 6;
    const items = genre.slice(0, size);

    const skip = Math.floor(Math.random() * 5);
    const recs = await prisma.books.findMany({
      where: {
        genres: {
          hasEvery: items,
        },
        tag: {
          hasSome: oneTag,
        },
      },
      take: 25,
      skip: skip,
    });

    try {
      res.render("bookPage", {
        books,
        title,
        recs,
        book_id,
        username,
        sessionAuth,
      });
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = bookController;
