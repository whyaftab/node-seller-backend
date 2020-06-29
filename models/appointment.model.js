const mongoose = require("mongoose");
Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  time: {
    type: String,
    required: "This field is required",
  },
  status: {
    type: Number,
    default: 0,
    maxlength: 1,
    required: "This field is required",
  },
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  _seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

mongoose.model("Appointment", userSchema);
