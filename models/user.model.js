const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "This field is required",
  },
  email: {
    type: String,
    required: "This field is required",
  },
  password: {
    type: String,
    required: "This field is required",
    minlength: 6,
  },
  isSeller: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String,
    default: null,
  },
  _appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  _slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSlot",
  },
});

mongoose.model("User", userSchema);
