//Import the dependencies
const express = require("express");
const mongoose = require("mongoose");

//Creating a Router
var router = express.Router();
//Link
const User = mongoose.model("User");
const Appointment = mongoose.model("Appointment");

//Router Controller for READ request

router.get("/sellers", async (req, res) => {
  const { name = "" } = req.query;
  User.find(
    {
      name: { $regex: ".*" + name + ".*", $options: "i" },
      isSeller: true,
    },
    "id name"
  )
    .populate("_slot")
    .exec((err, data) => {
      return res.send({ data });
    });
});

router.post("/appointment", async (req, res) => {
  const { sellerId, time } = req.body;
  const { userId } = req;
  const appointment = new Appointment({
    time,
    _seller: sellerId,
    _user: userId,
  });

  appointment.save((err, doc) => {
    return res.send({ message: "Appointment added successfully!", data: doc });
  });
});

module.exports = router;
