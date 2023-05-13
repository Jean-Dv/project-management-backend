import { gql } from 'graphql-tag'

export const typeDefs = gql`
    type Query {
        projects: [Project]
        project(id: Int!): Project
    }

    type Mutation {
        createProject(project: ProjectInput!): Project
        updateProject(project: ProjectInput!): Project
        deleteProject(id: Int!): Project
    }

    type Project {
        id: Int!
        name: String!
        description: String!
        tasks: [Task]
        updatedAt: String!
        createdAt: String!
    }

    input ProjectInput {
        id: Int
        name: String!
        description: String!
    }
`