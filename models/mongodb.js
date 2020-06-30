const mongoose = require("mongoose");
const { database } = require("../keys");

mongoose.connect(database.url, { useNewUrlParser: true }, (err) => {
  if (!err) {
    console.log("Successfully Established Connection with MongoDB");
  } else {
    console.log(
      "Failed to Establish Connection with MongoDB with Error: " + err
    );
  }
});

//Connecting Node and MongoDB
require("./user.model");
require("./userSlot.model");
require("./appointment.model");
