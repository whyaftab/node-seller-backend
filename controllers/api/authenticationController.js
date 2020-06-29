//Import the dependencies
const express = require("express");
const mongoose = require("mongoose");
const cryptHelper = require("../../lib/crypt");
const tokenHelper = require("../../lib/token");

const { matchPassword } = require("../../lib/crypt");

//Creating a Router
var router = express.Router();
//Link
const User = mongoose.model("User");
//Router Controller for READ request

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("body", req.body);
  if (!email && !password) {
    return res.status(404).send({ message: "Email and password is required!" });
  } else {
    try {
      await User.findOne(
        {
          email: email,
        },
        async (err, user) => {
          if (user && user.isSeller) {
            return res
              .status(401)
              .send({ message: "Seller login is not allowed" });
          }
          const passwordMatch = await cryptHelper.matchPassword(
            password,
            user.password
          );
          if (passwordMatch) {
            const token = await tokenHelper.generate(user._id);
            return res.status(200).send({ token, user });
          }
        }
      );
    } catch {
      return res.status(401).send({ message: "Incorrect email or password" });
    }
  }
});

module.exports = router;
