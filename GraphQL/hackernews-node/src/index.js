const { GraphQLServer } = require('graphql-yoga');

// resolvers: the actual implementation of the GraphQL schema
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root, args, context, info) => {
            return context.db.query.links({}, info)
        }
    },
    Mutation: {
        post: (root, args, context, info) => {
            return context.db.mutation.createLink({
                data: {
                    url: args.url,
                    description: args.description
                }
            }, info)
        },
        update: (root, args) => {
            const postIndex = links.findIndex(post => post.id === args.id);
            
            links[postIndex].description = args.description;
            links[postIndex].url = args.url;

            return links[postIndex];           
        },
        delete: (root, args) => {
            const postIndex = links.findIndex(post => post.id === args.id);
            const removedPost = links[postIndex];

            links.splice(postIndex, 1);
            
            return removedPost;
        }
    }
}

// the serve knows what API operations are accepted and how they should be resolved
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`));