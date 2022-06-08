const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const createError = require("http-errors");

const authController = {
  signupPage: async (req, res) => {
    const sessionAuth = req.session.isAuth;
    res.render("signup", { sessionAuth });
  },
  signUp: async (req, res) => {
    const { username, email, password } = req.body;
    // Check if email exists
    const user = prisma.user.findMany({
      where: { email: email },
    });
    if (user.length >= 1) {
      return res.status(409).json({
        message: "Mail already exists",
      });
    } else {
      // if the mail doesn't exist in the DB, hash and salt the password
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        } else {
          // then add the new user to the DB with the hashed and salted pawword
          const createUser = prisma.user.create({
            data: {
              username,
              email,
              password: hash,
            },
          });
          res.json(createUser);
        }
      });
    }
  },
  loginPage: async (req, res) => {
    const sessionAuth = req.session.Auth;
    res.render("login", { sessionAuth });
  },
  logIn: async (req, res) => {},
  logOut: async (req, res) => {
    req.session.destroy((err) => {
      if (err) throw reportError;
      res.redirect("/login");
    });
  },
};

module.exports = authController;
