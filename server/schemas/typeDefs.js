const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
        _id: ID
        email: String
        searches: [Search]
    }

    type Search {
        _id: ID
        city: String
        state: String
        country: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(email: String!): User
    }

    type Mutation {
        login (email: String!, password: String!): Auth
        addUser (email: String!, password: String!): Auth
        addSearch (email: String!, city: String!, state: String!, country: String!): Search
    }
`;

module.exports = typeDefs;