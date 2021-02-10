const { UserInputError } = require("apollo-server");
const Post = require("../../models/Post");
const { auth } = require("../../utils/middlewares");

module.exports = {
  Mutation: {
    async likePost(_, { post_id }, context) {
      const { id } = auth(context); // Returns the user data if logged in
      const post = await Post.findById(post_id);
      let status; // Like status (API return value)
      // Make sure the post exists
      if (!post) throw new UserInputError("Post not found!");
      // Grab the index of like for current user
      const index = post.likes.findIndex(like => like.user == id);
      // No records found, the user has not liked the post, like it
      if (index <= -1) post.likes.push({ user: id }), (status = "liked");
      else post.likes.splice(index, 1), (status = "disliked"); // Unlike the post

      await post.save(); // Update the post data
      return status; // String (liked|disliked)
    },
  },
};
