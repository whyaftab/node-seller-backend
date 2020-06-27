//Import the dependencies
const express = require("express");
const mongoose = require("mongoose");
const cryptHelper = require("../../lib/crypt");
const { matchPassword } = require("../../lib/crypt");

//Creating a Router
var router = express.Router();
//Link
const User = mongoose.model("User");
//Router Controller for READ request
router.get("/login", (req, res) => {
  res.render("sellers/login", {
    viewTitle: "Insert a New Course for Edureka",
    layout: "authorization",
    error: req.flash("error"),
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    req.flash("error", "Email and password should not be empty!");
    res.redirect("/login");
  } else {
    const user = User.findOne(
      {
        email: email,
      },
      async (err, doc) => {
        const passwordMatch = await cryptHelper.matchPassword(
          password,
          doc.password
        );
        if (passwordMatch) {
          req.session.user = doc;
          req.session.save(() => {
            console.log("sess", req.session);
          });
          res.redirect("/login");
        }
      }
    );
  }
});

module.exports = router;
