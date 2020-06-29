function loginAuth(req, res, next) {
  if (req.session.user && Object.keys(req.session.user).length) {
    res.redirect("/admin");
  } else {
    next();
  }
}

module.exports = loginAuth;
