import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    getAllPosts: [Post!]!
    getPostById(id: ID!): Post!
  }

  extend type Mutation {
    createNewPost(newPost: PostInput!): Post!
    deletePostById(id: ID!): PostNotification!
    editPostByID(updatedPost: PostInput!, id: ID!): Post!
  }

  input PostInput {
    title: String!
    content: String!
    featuredImage: String!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    featuredImage: String!
    updatedAt: String
    createdAt: String
  }

  type PostNotification {
    id: ID!
    message: String!
    success: String!
  }
`;
