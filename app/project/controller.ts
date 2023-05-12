import LOGGER from '@config/logger';
import prisma from "@root/prisma/client";
import { ProjectInput, Project } from "types/common/interfaces";
import { CreateProject, DeleteProject, GetProject, GetProjects, UpdateProject } from "types/common/functions";

export const getProjects: GetProjects = async (): Promise<Project[]> => {
    try {
        const projects = await prisma.project.findMany()
        return projects
    } catch (e) {
        LOGGER.debug.error(e)
        throw new Error("Error getting projects")
    }
}

export const getProject: GetProject = async (id: number): Promise<Project | null> => {
    try {
        const project = await prisma.project.findUnique({
            where: {
                id
            }
        })
        return project
    } catch (e) {
        LOGGER.debug.error(e)
        throw new Error("Error getting project")
    }
}

export const createProject: CreateProject = async (project: ProjectInput): Promise<Project> => {
    const { name, description } = project
    try {
        const newProject = await prisma.project.create({
            data: {
                name,
                description
            }
        })
        return newProject
    } catch (e) {
        LOGGER.debug.error(e)
        throw new Error("Error creating project")
    }
}

export const updateProject: UpdateProject = async (project: ProjectInput): Promise<Project> => {
    const { id, name, description } = project
    try {
        const updatedProject = await prisma.project.update({
            where: {
                id
            },
            data: {
                name,
                description
            }
        })
        return updatedProject
    } catch (e) {
        LOGGER.debug.error(e)
        throw new Error("Error updating project")
    }
}

export const deleteProject: DeleteProject = async (id: number): Promise<Project> => {
    try {
        const deletedProject = await prisma.project.delete({
            where: {
                id
            }
        })
        return deletedProject
    } catch (e) {
        LOGGER.debug.error(e)
        throw new Error("Error deleting project")
    }
}