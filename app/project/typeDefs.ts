import { gql } from 'graphql-tag'

export const typeDefs = gql`
    extend type Query {
        projects: [Project]
    }

    extend type Mutation {
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

    type ProjectInput {
        id: Int
        name: String!
        description: String!
    }
`