const User = require("../../models/User");

module.exports = async function (user_id) {
  const user = await User.findById(user_id);
  if (!user) throw new Error("Could not find author");
  const { username, firstname, lastname, createdAt } = user;
  return {
    username,
    name: { firstname, lastname },
    createdAt,
  };
};
