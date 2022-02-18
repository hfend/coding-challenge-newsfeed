import {ApolloServer, gql} from 'apollo-server-micro'
import * as resolvers from './resolvers'

const typeDefs = gql`
  type Announcement {
    id: Int!
    fellowship: String!
    title: String!
    body: String!
    created_ts: String!
    updated_ts: String!
  }

  type Project {
    id: Int!
    name: String!
    description: String!
    icon_url: String!
    created_ts: String!
    updated_ts: String!
    users: [User!]!
  }

  type User {
    id: Int!
    name: String!
    bio: String!
    avatar_url: String!
    fellowship: String!
    created_ts: String!
    updated_ts: String!
    projects: [Project!]!
  }

  type Query {
    announcement(id: Int!): Announcement!
    project(id: Int!): Project!
    user(id: Int!): User!
  }
`;

export const server = new ApolloServer({typeDefs, resolvers})
