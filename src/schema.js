const { gql } = require('apollo-server');

const typeDefs = gql`
    type Task {
        id: ID!
        title: String!
        completed: Boolean
    }

    type Query {
        tasks: [Task]
    }

    type Mutation {
        createTask(task: CreateTaskInput): Task
        updateTask(task: UpdateTaskInput): Task
        deleteTask(id: ID!): [Task]
    }

    input CreateTaskInput {
        title: String!
        completed: Boolean!
    }

    input UpdateTaskInput {
        id: ID!
        completed: Boolean!
    }
`;

module.exports = typeDefs;
