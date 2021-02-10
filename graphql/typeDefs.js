const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    author: Author!
    body: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
    createdAt: String!
  }
  type Author {
    name: Name!
    username: String!
    createdAt: String!
  }
  type Comment {
    id: ID!
    body: String!
    author: Author!
    createdAt: String!
  }
  type Like {
    id: ID!
    author: Author!
    createdAt: String!
  }
  type Name {
    firstname: String!
    lastname: String
  }
  type User {
    name: Name!
    username: String!
    token: String!
    createdAt: String!
  }
  input RegisterData {
    firstname: String!
    lastname: String
    username: String!
    email: String!
    password: String!
    confirm_password: String!
  }
  type Query {
    getPosts: [Post]!
    getPost(post_id: ID!): Post!
    login(username: String!, password: String!): User!
  }
  type Mutation {
    register(RegisterData: RegisterData): User!
    createPost(body: String!): Post!
    deletePost(post_id: String!): ID!
    createComment(post_id: ID!, body: String!): ID!
    deleteComment(post_id: ID!, comment_id: ID!): Comment!
    likePost(post_id: ID!): String!
  }
  type Subscription {
    newPost: Post!
  }
`;
