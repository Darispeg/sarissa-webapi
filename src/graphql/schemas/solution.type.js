const { gql } = require('apollo-server-express')

const solutionSchema = gql `
    type Solution {
        id: ID,
        organizer: User!
        members: [ Member ]!
        title: String!
        description: String!
        trigger: String!
        created: String!
        modified: String!
        corrective_actions: [ Action ]
        status: String
    }

    type Member {
        id: ID,
        role: String
        member : User,
        validation : String
    }

    type Action {
        id: ID,
        why: String!
        evidence: String
        root_cause: Boolean
        comment: String
        user_validation: [ UserValidation ]
    }

    type UserValidation {
        id: ID,
        member: String
        validation: Boolean
    }

    type Query {
        getAllSolutions : [ Solution ],
        getSolution(id: ID) : Solution
    }

    input SolutionInput {
        projectId: ID!
        organizer: ID!
        members: [ MemberInput ]!
        title: String!
        description: String!
        trigger: String!
        corrective_actions: [ ActionInput ]
        status: String
    }

    input MemberInput {
        role: String!
        member : ID!,
        validation : String
    }

    input ActionInput {
        why: String!
        evidence: String!
        root_cause: Boolean!
        comment: String
        user_validation: [ UserValidationInput ]
    }

    input UserValidationInput {
        member: String
        validation: Boolean
    }

    type Mutation {
        createSolution(solution: SolutionInput!): Solution
        updateSolution(id: ID!, solution: SolutionInput!): Solution
        deleteSolution(id: ID!): String
        addCorrectiveAction(solutionId: ID!, action: ActionInput!): SolutionProblem
        removeCorrectiveAction(solutionId: ID!, actionId: ID!): SolutionProblem
        updateMemberValidation(solutionId: ID!, memberId: ID!, updateValidation: String): SolutionProblem
        updateActionValidation(solutionId: ID!, correctiveActionId : ID!, memberId: ID!, updateValidation: Boolean!): SolutionProblem
    }
`
module.exports = { solutionSchema }