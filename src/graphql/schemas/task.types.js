const { gql } = require('apollo-server-express')

const taskSchema = gql `
    type Task {
        id: ID,
        parent: ID
        title: String!
        description: String!
        assigned_users: [User]!
        start_date : String
        task_completion: TaskCompletion!
        root_cause: String!
        source_action: String!
        progress: String
        status: String
        created: String!
        modified: String!
    }

    type TaskCompletion {
        target_completion : String
        actual_completion : String
    }

    type Query {
        getAllTasks : [Task],
        getTask(id: ID) : Task
    }

    input TaskCompletionInput {
        target_completion : String
        actual_completion : String
    }

    input TaskInput {
        projectId : String!
        title: String!
        description: String!
        parent : String
        assigned_users: [ID]
        start_date : String
        task_completion: TaskCompletionInput!
        root_cause: String!
        source_action: String!
        progress: String
        status: String
    }

    type Mutation {
        createTask(task: TaskInput!): Task,
        updateTask(id: ID!, task: TaskInput!): Task,
        deleteTask(id: ID!): String
    }
`

module.exports = { taskSchema }