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

    type Query {
        users: [User]
        user(email: String!): User
    }
`;

module.exports = typeDefs;