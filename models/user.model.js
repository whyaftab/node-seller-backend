const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  id: {
    type: String,
    auto: true,
  },
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
});

mongoose.model("User", userSchema);
