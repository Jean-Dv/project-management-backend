import { gql } from 'graphql-tag'

export const typeDefs = gql`
    extend type Query {
        tasks: [Task]
        task(id: Int!): Task
    }

    extend type Mutation {
        createTask(task: TaskInput!): Task
        updateTask(task: TaskInput!): Task
        deleteTask(id: Int!): Task
    }

    type Task {
        id: Int!
        name: String!
        description: String!
        status: Status!
        completed: Boolean!
        project: Project!
        updatedAt: String!
        createdAt: String!
    }

    input TaskInput {
        id: Int
        name: String!
        description: String!
        status: Status!
        completed: Boolean!
        projectId: Int!
    }

    enum Status {
        TODO
        PROGRESS
        BLOCKED
        CODEREVIEW
        DONE
    }
`