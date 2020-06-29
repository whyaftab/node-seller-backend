//Import the dependencies
const express = require("express");
const mongoose = require("mongoose");
//Creating a Router
var router = express.Router();
//Link
const Appointment = mongoose.model("Appointment");

//Router Controller for READ request
router.get("/appointment", (req, res) => {
  const { user } = req.session;
  Appointment.find({ _seller: user._id })
    .populate(["_seller", "_user"])
    .exec((err, appointments) => {
      res.render("appointment/index", {
        appointments: appointments.length && appointments,
        success: req.flash("success"),
        error: req.flash("error"),
      });
    });
});

//Router Controller for READ request
router.get("/appointment/accept/:id", (req, res) => {
  const { id } = req.params;
  Appointment.findOneAndUpdate({ _id: id }, { status: 1 }, (err, slot) => {
    req.flash("success", "Appointment accepted successfully!");
    res.redirect("/admin/appointment");
  });
});

//Router Controller for READ request
router.get("/appointment/reject/:id", (req, res) => {
  const { id } = req.params;
  Appointment.findOneAndUpdate({ _id: id }, { status: 2 }).exec((err, slot) => {
    req.flash("success", "Appointment rejected successfully!");
    res.redirect("/admin/appointment");
  });
});

module.exports = router;
