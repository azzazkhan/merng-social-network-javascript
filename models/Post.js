const { model, Schema } = require("mongoose");

const postSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1000,
    },
    comments: [
      {
        body: {
          type: String,
          required: true,
          minlength: 1,
          maxlength: 255,
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        createdAt: {
          type: Date,
          default: new Date().toISOString(),
        },
      },
    ],
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        createdAt: {
          type: Date,
          default: new Date().toISOString(),
        },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model("Post", postSchema);
