const token = {};
const jwt = require("jsonwebtoken");
const { secretToken } = require("../keys");

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
    console.log(decoded);
    req.userId = decoded.id;
    next();
  } catch (e) {
    return res.status(500).json({
      auth: false,
      message: "Failed to authenticate token.",
    });
  }
};

token.generate = async (username) => {
  const aux = jwt.sign({ id: username }, secretToken, { expiresIn: 86400 });
  console.log("Token.." + aux);
  return aux;
};

module.exports = token;
