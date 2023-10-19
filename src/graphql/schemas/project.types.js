const { gql } = require('apollo-server-express')

const projectSchema = gql `
    type Project {
        id: ID,
        organizer: User!
        members: [User]!
        title: String!
        description: String!
        tasks: [Task]
        solutions: [SolutionProblem]
        created: String!
        modified: String!
        project_completion: ProjectCompletion!
        icon: String
        status: String
    }

    type SolutionProblem {
        id: ID,
        organizer: User!
        members: [ MemberSolution ]!
        title: String!
        description: String!
        trigger: String!
        created: String!
        modified: String!
        corrective_actions: [ ActionSolution ]
        status: String
    }

    type MemberSolution {
        id: ID,
        role: String
        member : ID,
        validation : String
    }

    type ActionSolution {
        id: ID,
        why: String!
        evidence: String
        root_cause: Boolean
        comment: String
    }

    type ProjectCompletion {
        target_completion : String
        actual_completion : String
    }

    type Query {
        getAllProject : [Project],
        getProject(id: ID) : Project
    }

    input ProjectCompletionInput {
        target_completion : String
        actual_completion : String
    }

    input ProjectInput {
        organizer: ID!
        members: [ID]!
        title: String!
        short_title: String
        description: String!
        project_completion: ProjectCompletionInput!
        icon: String
        status: String
    }

    type Mutation {
        createProject(project: ProjectInput!): Project,
        updateProject(id: ID!, project: ProjectInput!): Project,
        deleteProject(id: ID!): String
    }
`

module.exports = { projectSchema }