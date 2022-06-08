// middleware to check if the user is authentificated or not
const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/login");
  }
};

module.exports = isAuth;
