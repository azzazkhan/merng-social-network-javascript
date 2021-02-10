const { AuthenticationError, UserInputError } = require("apollo-server");
const Post = require("../../models/Post");
const { auth } = require("../../utils/middlewares");

module.exports = {
  Mutation: {
    async createComment(_, { post_id, body }, context) {
      const { id } = auth(context); // Returns user data if logged in

      // Comment must have a valid body
      if (typeof body != "string" || body.trim().length <= 0) {
        errors = { comment: "Cannot post an empty comment!" };
        throw new UserInputError("Invalid comment", { errors });
      }
      // Make sure the post exists
      const post = await Post.findById(post_id);
      if (!post) throw new UserInputError("Post not found!");
      // Add new comment to the top
      post.comments.unshift({ body, user: id });
      await post.save(); // Update the post data

      return post.comments[0]._id;
    },
    async deleteComment(_, { post_id, comment_id }, context) {
      const { id } = auth(context); // Returns user data if logged in
      // Make sure the post exists
      const post = await Post.findById(post_id);
      if (!post) throw new Error("Post does not exist!");
      // Make sure the comment exists for current post
      const index = post.comments.findIndex(c => c.id === comment_id);
      if (index <= -1) throw new Error("Comment does not exist!");
      // Make sure the comment belongs to the current user
      if (post.comments[index].user != id)
        throw new AuthenticationError("Action not allowed!");
      // Remove the comment from current post
      const C_ID = post.comments[index];
      post.comments.splice(index, 1);
      await post.save(); // Update the post data
      return C_ID;
    },
  },
};
