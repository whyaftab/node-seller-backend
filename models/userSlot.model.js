const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  days: {
    type: Array,
    required: "This field is required",
  },
  fromTime: {
    type: String,
    required: "This field is required",
  },
  toTime: {
    type: String,
    required: "This field is required",
  },
  _seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

mongoose.model("UserSlot", userSchema);
