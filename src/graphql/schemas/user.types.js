const { gql } = require('apollo-server-express')

const userSchema = gql `
    type User {
        id: ID,
        ci: String!
        name: String!
        last_name: String!
        email: String!
        phone: String!
        birthday: String
        position: String!
        password: String!
        status: String!
        role: String!
        created: String!
        modified: String!
    }

    type Query {
        getAllUsers : [User],
        getUser(id: ID) : User
    }

    input UserInput {
        id: ID
        ci: String!
        name: String!
        last_name: String!
        email: String!
        phone: String!
        birthday: String
        position: String!
        password: String!
        status: String!
        role: String!
    }

    type Mutation {
        createUser(user: UserInput!): User,
        updateUser(id: ID!, user: UserInput!): User,
        deleteUser(id: ID!): String
    }
`

module.exports = { userSchema }