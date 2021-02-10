const { AuthenticationError } = require("apollo-server");
const Post = require("../../models/Post");
const { auth } = require("../../utils/middlewares");

module.exports = {
  Query: {
    async getPosts() {
      try {
        // Fetch all the posts (newest posts comes first)
        return await Post.find().sort({ createdAt: -1 });
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { post_id }) {
      try {
        const post = await Post.findById(post_id);
        if (post) return post;
        else throw Error("Post not found");
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = auth(context); // Check if the user is logged in

      // Post must have a valid body
      if (typeof body != "string" || body.trim().length <= 0) {
        errors = { post: "Cannot publish an empty post!" };
        throw new UserInputError("Invalid post", { errors });
      }

      const newPost = Post({
        user: user.id,
        body,
      });
      const post = await newPost.save(); // Save the post to database

      // Store the object (to be sent to pubsub and mutation)
      const post_obj = {
        // ...res._doc, // Exposes all the fields returned from Mongo query
        id: post._id,
        user: post.user,
        body: post.body,
        createdAt: post.createdAt, // Defined (timestamps) in model's schema
      };

      // Publish new post to subscription
      context.pubsub.publish("NEW_POST", {
        newPost: post_obj,
      });

      // Return the post object to normal mutation
      return post_obj;
    },
    async deletePost(_, { post_id }, context) {
      const user = auth(context); // Check if the user is logged in
      try {
        // Make sure if post does exists
        const post = await Post.findById(post_id);
        if (!post) throw new Error("Post not found!");
        // Make sure the post belongs to current user
        if (post.user != user.id)
          throw new AuthenticationError("Action not allowed!");
        await post.delete(); // Delete the post
        return post_id; // Send back the ID of deleted post
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    },
  },
};
