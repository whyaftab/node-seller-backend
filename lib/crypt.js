const crypt = {};
const bcrypt = require("bcryptjs");
crypt.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
crypt.matchPassword = async (password, savePassword) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    console.log("FormPass:" + hash);
    return await bcrypt.compare(password, savePassword);
  } catch (e) {
    console.log("error." + e);
  }
};

module.exports = crypt;
