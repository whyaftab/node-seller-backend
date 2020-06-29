function webAuth(req, res, next) {
  if (req.session.user && Object.keys(req.session.user).length) {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = webAuth;
