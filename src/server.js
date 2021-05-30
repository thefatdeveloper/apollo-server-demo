const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const tasks = require('./tasks');
console.log(tasks);
const dataSources = () => ({
    getTasks: () => tasks,
});

// Set up Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    introspection: true,
    playground: true,
});

server.listen().then(() => {
    console.log(`
      Server is running!
      Listening on port 4000     
    `);
});
