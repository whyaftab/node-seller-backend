//Import the dependencies
const express = require("express");
const mongoose = require("mongoose");
//Creating a Router
var router = express.Router();
//Link

//Router Controller for READ request
router.get("/", (req, res) => {
  res.render("sellers/login", {
    viewTitle: "Insert a New Course for Edureka",
  });
});

module.exports = router;
