const { PrismaClient } = require("@prisma/client");
const { json } = require("express");
const prisma = new PrismaClient();

const tagController = {
  tagPage: async (req, res) => {
    const { search } = req.query;
    let usingSplit = search.split(",");

    usingSplit.pop();
    const results = usingSplit.map((element) => {
      return element.trim();
    });
    const sessionAuth = req.session.isAuth;

    const books = await prisma.Book.findMany({
      where: {
        tag: {
          hasEvery: results,
        },
      },
      orderBy: [
        {
          numGdRating: "desc",
        },
        {
          gdRating: "desc",
        },
      ],
    });
    res.render("searchPage", { search, books, sessionAuth });
  },
  searchEngine: async (req, res) => {
    // filtered tropes put in a variable
    const tropes = await prisma.Tropes.findMany({ select: { trope: true } });
    const data = tropes.map(function (trope) {
      return trope["trope"];
    });
    res.json(data);
  },
  tagsPage: async (req, res) => {
    const { tag } = req.params;
    const sessionAuth = req.session.isAuth;
    try {
      const books = await prisma.Book.findMany({
        where: {
          tag: {
            has: tag.toLowerCase(),
          },
        },
        orderBy: [
          {
            numGdRating: "desc",
          },
          {
            gdRating: "desc",
          },
        ],
      });
      res.render("allTagsPage", { books, tag, sessionAuth });
    } catch (err) {
      console.log(err);
    }
  },
  authorPage: async (req, res) => {
    const { author } = req.params;
    const sessionAuth = req.session.isAuth;
    try {
      const books = await prisma.Book.findMany({
        where: {
          author: {
            contains: author,
            mode: "insensitive",
          },
        },
        orderBy: [
          {
            numGdRating: "desc",
          },
          {
            gdRating: "desc",
          },
        ],
      });
      res.render("allAuthorsPage", { books, author, sessionAuth });
    } catch (err) {
      console.log(err);
    }
  },
  seriesPage: async (req, res) => {
    const { series } = req.params;
    const sessionAuth = req.session.isAuth;
    try {
      const books = await prisma.Book.findMany({
        where: {
          seriesName: {
            contains: series,
            mode: "insensitive",
          },
        },
        orderBy: {
          numSeries: "asc",
        },
      });
      res.render("seriesPage", { books, series, sessionAuth });
    } catch (err) {
      console.log(err);
    }
  },
  genrePage: async (req, res) => {
    const { genre } = req.params;
    const sessionAuth = req.session.isAuth;
    try {
      const books = await prisma.Book.findMany({
        where: {
          genres: {
            has: genre,
          },
        },
      });
      res.render("genrePage", { books, genre, sessionAuth });
    } catch (err) {
      console.log(err);
    }
  },
  tropeList: async (req, res) => {
    try {
      const sessionAuth = req.session.isAuth;
      const tropes = await prisma.Tropes.findMany({
        select: { trope: true },
        orderBy: {
          trope: "asc",
        },
      });

      res.render("listOfTropes", { sessionAuth, tropes });
    } catch (err) {
      console.log(err);
      res.render("error");
    }
  },
};

module.exports = tagController;
