const token = {};
const jwt = require("jsonwebtoken");
const { secretToken } = require("../keys");
const mongoose = require("mongoose");
const User = mongoose.model("User");

token.verify = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).json({
      auth: false,
      message: "No Token Provided",
    });
  }
  try {
    const decoded = await jwt.verify(token, "supersecret");
    req.userId = decoded.id;
    next();
  } catch (e) {
    return res.status(500).json({
      auth: false,
      message: "Failed to authenticate token.",
    });
  }
};

token.generate = async (id) => {
  const aux = jwt.sign({ id }, secretToken, { expiresIn: 86400 });
  console.log("Token.." + aux);
  return aux;
};

module.exports = token;
