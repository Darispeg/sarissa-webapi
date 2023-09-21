const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express')

const { connectDB } = require('./db');
const { userSchema } = require('./graphql/schemas/user.types');
const { projectSchema } = require('./graphql/schemas/project.types');
const { taskSchema } = require('./graphql/schemas/task.types');
const { userResolver } = require('./graphql/resolvers/user.resolvers');
const { projectResolver } = require('./graphql/resolvers/project.resolvers');
const { taskResolver } = require('./graphql/resolvers/task.resolvers');

const app = express();  
app.get('/', (req, res) => res.send('WELCOME SARISA API'));

connectDB();
module.exports = app;

async function start() {
    const apolloServer = new ApolloServer({
        typeDefs : gql `
            ${userSchema}
            ${projectSchema}
            ${taskSchema}
        `,
        resolvers : {
            Query : {
                ...userResolver.Query,
                ...projectResolver.Query,
                ...taskResolver.Query 
            },
            Mutation : {
                ...userResolver.Mutation,
                ...projectResolver.Mutation,
                ...taskResolver.Mutation
            }
        },
        playground: true,
        introspection: true
    });

    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.get('*', (req, res) => res.status(404).send('Not Found'));

    app.listen(5000, () => {
        console.log('Server on port', 5000);
    });
}

start();