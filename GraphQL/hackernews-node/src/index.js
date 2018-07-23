const { GraphQLServer } = require('graphql-yoga');

// GraphQL schema
const typeDefs = `
type Query {
    info: String!
}
`

// resolvers: the actual implementation of the GraphQL schema
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`
    }
}

// the serve knows what API operations are accepted and how they should be resolved
const server = new GraphQLServer({
    typeDefs,
    resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`));