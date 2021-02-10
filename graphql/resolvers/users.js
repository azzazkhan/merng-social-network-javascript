const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const {
  validateRegisterData,
  validateLoginData,
} = require("../../utils/validators"); // For validating passed data
const User = require("../../models/User");
require("dotenv/config");

function generateOAuthToken(user) {
  return jwt.sign(
    {
      id: user.id, // Auto generated ID
      email: user.email,
      username: user.username,
    },
    process.env.JWT_KEY, // Secret key to encrypt/decrypt payload
    { expiresIn: "1h" }, // Expires in one hour
  );
}

module.exports = {
  Query: {
    async login(_, { username, password }) {
      // Validate passed user data
      const { errors, valid } = validateLoginData(username, password);

      // Throw a `UserInputError` if any field is failed to validate
      if (!valid) throw new UserInputError("Error encounted", { errors });

      // Check if user does exists of provided username
      const user = await User.findOne({ username });
      if (!user) {
        errors.auth = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      // Compare the password sent with the one stored in records
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.auth = "Invalid login credentials";
        throw new UserInputError("Invalid login credentials", { errors });
      }

      // Create token for current user
      const token = generateOAuthToken(user);

      // Return the `User` object
      return {
        // ...res._doc, // Exposes all the fields returned from Mongo query
        // id: user._id, // Prevent exposing primary key
        name: {
          firstname: user.firstname,
          lastname: user.lastname,
        },
        token,
        username: user.username,
        createdAt: user.createdAt, // Defined (timestamps) in model's schema
      };
    },
  },
  Mutation: {
    async register(
      _,
      {
        RegisterData: {
          firstname,
          lastname,
          username,
          email,
          password,
          confirm_password,
        },
      },
    ) {
      // Validate passed user data
      let { errors, valid } = validateRegisterData(
        firstname,
        lastname,
        username,
        email,
        password,
        confirm_password,
      );
      // Throw a `UserInputError` if any field is failed to validate
      if (!valid) throw new UserInputError("Error encounted", { errors });

      // Check if user already exists with provided username
      let user = await User.findOne({ username });
      if (user)
        // User already exists with passed username
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is already taken",
          },
        });

      // Encrypt the password
      password = await bcrypt.hash(password, 12);

      // Create a query for inserting new user
      const newUser = User({
        firstname,
        lastname,
        username,
        password,
        email,
      });

      // Save the user data on the database
      const res = await newUser.save();

      // Create token for current user
      const token = generateOAuthToken(res);

      // Return the `User` object
      return {
        // ...res._doc, // Exposes all the fields returned from Mongo query
        // id: res._id, // Prevent exposing primary key
        name: {
          firstname: res.firstname,
          lastname: res.lastname,
        },
        token,
        username: res.username,
        createdAt: res.createdAt, // Defined (timestamps) in model's schema
      };
    },
  },
};
