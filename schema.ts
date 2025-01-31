export const typeDefs = `#graphql


    type Restaurant {
        id: ID!
        name: String!,
        address: String!,
        city: String!,
        phone: String,
        temp: String!,
        localtime: String!,
    }

    type Query {
        getRestaurant (id: String!): Restaurant!,
        getRestaurants (city: String!): [Restaurant!]!,
    },

    type Mutation {
        addRestaurant (name: String!, address: String!, city: String!, phone: String!): Restaurant!,
        deleteRestaurant (id: String!): Boolean!
    }
`