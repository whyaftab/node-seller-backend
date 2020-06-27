function webAuth(req, res, next) {
  console.log("user", req.session);
  if (req.session.user && Object.keys(req.session.user).length) {
    next();
  } else {
    res.redirect("/login");
  }
}

module.exports = webAuth;
