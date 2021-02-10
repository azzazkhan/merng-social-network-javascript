const postsResolver = require("./posts");
const usersResolver = require("./users");
const commentsResolver = require("./comments");
const likesResolver = require("./likes");

const fetch_author = require("../../utils/functions/fetch_author");

module.exports = {
  Post: {
    likeCount: parent => parent.likes.length,
    commentCount: parent => parent.comments.length,
    author: parent => fetch_author(parent.user),
  },
  Comment: { author: parent => fetch_author(parent.user) },
  Like: { author: parent => fetch_author(parent.user) },
  Query: {
    ...postsResolver.Query,
    ...usersResolver.Query,
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...postsResolver.Mutation,
    ...commentsResolver.Mutation,
    ...likesResolver.Mutation,
  },
  Subscription: {
    ...postsResolver.Subscription,
  },
};
