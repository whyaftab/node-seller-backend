//Import the dependencies
const express = require("express");
const mongoose = require("mongoose");
//Creating a Router
var router = express.Router();
//Link
const User = mongoose.model("User");
//Router Controller for READ request
router.get("/login", (req, res) => {
  res.render("sellers/login", {
    viewTitle: "Insert a New Course for Edureka",
  });
});

router.post("/login", (req, res) => {
  if (req.email != "" && req.password != "") {
    User.where({ email: req.email, password: req.password });
  }
});

module.exports = router;
