import LOGGER from "@config/logger";
import prisma from "@root/prisma/client";
import type { Task, TaskInput, Project } from "types/common/interfaces";
import type { CreateTask, DeleteTask, UpdateTask, GetTasks, GetTask, GetProjectOfTask } from "types/common/functions";

export enum Status {
    TODO = 'TODO',
    PROGRESS = 'PROGRESS',
    BLOCKED = 'BLOCKED',
    CODEREVIEW = 'CODEREVIEW',
    DONE = 'DONE'
}

export const getTasks: GetTasks = async (): Promise<Task[]> => {
    try {
        const tasks = await prisma.task.findMany()
        return tasks
    } catch (e) {
        LOGGER.debug.error(e)
        throw new Error("Error getting tasks")
    }
}

export const getTask: GetTask = async (id: number): Promise<Task | null> => {
    try {
        const task = await prisma.task.findUnique({
            where: {
                id
            }
        })
        return task
    } catch (e) {
        LOGGER.debug.error(e)
        throw new Error("Error getting task")
    }
}

export const createTask: CreateTask = async (task: TaskInput): Promise<Task> => {
    const { name, description, status, completed, projectId } = task
    try {
        const newTask = await prisma.task.create({
            data: {
                name,
                description,
                status,
                completed,
                projectId
            },
        })
        return newTask
    } catch (e) {
        LOGGER.debug.error(e)
        throw new Error("Error creating task")
    }
}

export const updateTask: UpdateTask = async (task: TaskInput): Promise<Task> => {
    const { id, name, description, status, completed, projectId } = task
    try {
        const updatedTask = await prisma.task.update({
            where: {
                id
            },
            data: {
                name,
                description,
                status,
                completed,
                projectId
            }
        })
        return updatedTask
    } catch (e) {
        LOGGER.debug.error(e)
        throw new Error("Error updating task")
    }
}

export const deleteTask: DeleteTask = async (id: number): Promise<Task> => {
    try {
        const deletedTask = await prisma.task.delete({
            where: {
                id
            }
        })
        return deletedTask
    } catch (e) {
        LOGGER.debug.error(e)
        throw new Error("Error deleting task")
    }
}

export const getProjectOfTask: GetProjectOfTask = async (id: number): Promise<Project | null> => {
    try {
        const task = await prisma.project.findUnique({
            where: {
                id
            }
        })
        return task
    } catch (e) {
        LOGGER.debug.error(e)
        throw new Error("Error getting project of task")
    }
}