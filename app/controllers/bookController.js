const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bookController = {
  homePage: async (req, res) => {
    const sessionAuth = req.session.isAuth;
    const booksCount = await prisma.Book.count();
    const skip = Math.floor(Math.random() * booksCount);

    const books = await prisma.Book.findMany({
      skip: skip,
      take: 4,
      orderBy: {
        id: "desc",
      },
    });

    // filtered tropes put in a variable
    const tropes = await prisma.Tropes.findMany({ select: { trope: true } });
    const filteredTropes = tropes.map(function (trope) {
      return trope["trope"];
    });
    res.render("homepage", { books, sessionAuth, filteredTropes });
  },
  bookPage: async (req, res) => {
    const { title } = req.params;
    req.params.book_id = parseInt(req.params.book_id);
    const { book_id } = req.params;

    try {
      const tropes = await prisma.Tropes.findMany({
        select: { trope: true },
      });
      const filteredTropes = tropes.map(function (trope) {
        return trope["trope"];
      });
      const { username, user_id } = req.session;
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
      const isWished = await prisma.wishlist.findMany({
        where: {
          book_id: book_id,
          user_id: user_id,
        },
      });
      const bookGenre = await prisma.Book.findMany({
        where: { book_id: book_id },
        select: {
          genres: true,
          tag: true,
        },
      });
      const oneGenre = bookGenre[0].genres;
      const oneTag = bookGenre[0].tag;
      function removeDuplicates(data) {
        return data.filter((value, index) => data.indexOf(value) === index);
      }
      const tags = removeDuplicates(oneTag);
      const genre = removeDuplicates(oneGenre);
      const filteredTag = tags.filter((item) => filteredTropes.includes(item));
      const items = genre.splice(0, 3);

      const recs = await prisma.Book.findMany({
        where: {
          genres: {
            hasEvery: items,
          },
          tag: {
            hasSome: filteredTag,
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
        genre,
        tags,
        recs,
        book_id,
        user_id,
        username,
        sessionAuth,
        avgStars,
        isWished,
        filteredTropes,
      });
    } catch (err) {
      console.log(err);
    }
  },
  wishlistPage: async (req, res) => {
    const sessionAuth = req.session.isAuth;
    try {
      const { user_id, username } = req.session;
      const book = await prisma.wishlist.findMany({
        where: {
          user_id: user_id,
        },
        include: {
          book: true,
        },
      });
      res.render("wishlistPage", {
        sessionAuth,
        user_id,
        book,
        username,
      });
    } catch (err) {
      console.log(err);
      res.render("error");
    }
  },
  addWishlist: async (req, res, next) => {
    const { user_id } = req.session;
    const { book_id } = req.params;
    try {
      const wishlist = await prisma.wishlist.create({
        data: {
          book_id: parseInt(book_id),
          user_id: user_id,
        },
      });

      res.redirect("/wishlist");
    } catch (err) {
      console.log(err);
      res.render("error");
    }
  },
  addWishlistPage: async (req, res, next) => {
    next();
    res.redirect("/wishlist");
  },
  deleteWishlist: async (req, res) => {
    const { book_id } = req.params;
    const { user_id } = req.session;
    try {
      const deleteWishlist = await prisma.wishlist.deleteMany({
        where: { book_id: parseInt(book_id), user_id: user_id },
      });
      res.redirect("/wishlist");
    } catch (err) {
      console.log(err);
      res.render("error");
    }
  },
};

module.exports = bookController;
