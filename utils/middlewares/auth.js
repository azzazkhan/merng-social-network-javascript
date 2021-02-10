const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
require("dotenv/config");

module.exports = ({ res: { req } }) => {
  const auth_header = req.headers.authorization;
  if (auth_header) {
    // Bearer ....
    const token = auth_header.split("Bearer ")[1];
    if (!token)
      throw new Error("No oAuth token present inside Authorization header!");
    try {
      return jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
      throw new AuthenticationError("An invalid/expired oAuth token was sent!");
    }
  } else throw new Error("Authorization header must be provided!");
};
