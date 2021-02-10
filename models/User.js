const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    lastname: {
      type: String,
      required: false,
      minlength: 3,
      maxlength: 30,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 15,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: false,
      trim: true,
      minlength: 6,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model("User", userSchema);
