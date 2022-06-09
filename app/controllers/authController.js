const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const authController = {
  signupPage: async (req, res) => {
    const sessionAuth = req.session.isAuth;
    res.render("signup", { sessionAuth });
  },
  signUp: async (req, res) => {
    const { username, email, password } = req.body;
    // Check if email exists
    const user = prisma.User.findMany({
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
          const createUser = prisma.User.create({
            data: {
              username,
              email,
              password: hash,
            },
          })
            .then((result) => {
              res.redirect("/login");
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            });
        }
      });
    }
  },
  loginPage: async (req, res) => {
    const sessionAuth = req.session.Auth;
    res.render("login", { sessionAuth });
  },
  logIn: async (req, res) => {
    const { email, username, password } = req.body;

    // check if user exists
    const user = await prisma.User.findUnique({ where: { email: email } });
    // if user doesn't exist, redirect to the login page
    if (!user) {
      return res.redirect("/login");
    }
    // check if the password entered is the same as the user's in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    // if not, redirect to the login page
    if (!isMatch) {
      return res.redirect("/login");
    }
    // if everything matches, redirect to the homepage
    const oneUser = await prisma.User.findUnique({where: {username: username}});
    req.session.user_id = oneUser.user_id;
    req.session.isAuth = true;
    req.session.username = username;
    const sessionAuth = req.session.isAuth;
    res.redirect("/");
  },
  logOut: async (req, res) => {
    req.session.destroy((err) => {
      if (err) throw reportError;
      res.redirect("/login");
    });
  },
};

module.exports = authController;
