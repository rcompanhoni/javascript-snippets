const { GraphQLServer } = require('graphql-yoga');

// fake data
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
}]
let idCount = links.length

// resolvers: the actual implementation of the GraphQL schema
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links
    },
    Mutation: {
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link);
            return link;
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