//Import the dependencies
const express = require("express");
const mongoose = require("mongoose");
//Creating a Router
var router = express.Router();
//Link
const UserSlot = mongoose.model("UserSlot");
const User = mongoose.model("User");

//Router Controller for READ request
router.get("/slot", (req, res) => {
  const { user } = req.session;
  UserSlot.findOne({ _seller: user._id }, (err, slot) => {
    res.render("slots/index", {
      slot: slot,
      success: req.flash("success"),
      error: req.flash("error"),
    });
  });
});

//Router Controller for READ request
router.post("/slot", (req, res) => {
  const { days, fromTime, toTime } = req.body;
  const { user } = req.session;
  const data = { days, fromTime, toTime, _seller: user._id };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  UserSlot.findOneAndUpdate(
    { _seller: user._id },
    data,
    options,
    (err, slot) => {
      User.findOneAndUpdate({ _id: user._id }, { _slot: slot._id }).exec(
        (err, doc) => {
          req.flash("success", "Slot successfully updated!");
          res.redirect("/admin/slot");
        }
      );
    }
  );
});

module.exports = router;
