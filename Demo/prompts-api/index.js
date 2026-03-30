const { ApolloServer, gql } = require('apollo-server')
const { Prompt, sequelize } = require('./models')

const port = process.env.PORT || 4000

// Schema Definition Language (SDL)
// Define what types of data are available in GraphQL server
const typeDefs = gql`
type Prompt {
    title: String!
    id: ID!
}
type Query {
    prompt: Prompt
}
`
// Resolver Map
// Execute logic based on the backend model
const resolvers = {
    Query: {
        // parent : object that contains parent type (Query)
        // arg: handles any arguments passed into field
        // context: an object shared by all resolvers in GraphQL operations
        // info: information about the execution of our operations
        prompt: async (parent, args, context, info) => {
            const prompts = await Prompt.findOne({
                order: sequelize.random()
            })
            return prompts
        }
    }
}
// 
const server = new ApolloServer({
    typeDefs, resolvers
})

server.listen({port}, () => console.log(`Server running on localhost:${port}!`))