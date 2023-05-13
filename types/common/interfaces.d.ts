import { Status } from '@app/tasks/enum';
import { PrismaClient } from '@prisma/client'
import { DeepMockProxy } from 'jest-mock-extended';
export interface IEnvironment {
    NODE_ENV: string
    PORT: number
}

export interface MyContext {
    token?: String;
}

export interface Project {
    id: number
    name: string
    description: string | null
    updatedAt: Date
    createdAt: Date
}

export interface ProjectInput {
    id?: number
    name: string
    description: string
}

export interface Task {
    id: number
    name: string
    description: string | null
    status: Status
    completed: boolean
    project: Project
    updatedAt: Date
    createdAt: Date
}

export interface TaskInput {
    id?: number
    name: string
    description: string
    status: Status
    completed: boolean
    projectId: number
}

export type PrismaContext = {
    prisma: PrismaClient
}

export type PrismaMockContext = {
    prisma: DeepMockProxy<PrismaClient>
}