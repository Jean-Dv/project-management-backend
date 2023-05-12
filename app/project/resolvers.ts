import { ProjectInput, Project } from 'types/common/interfaces';
import { createProject, deleteProject, getProject, getProjects, updateProject } from './controller';

export const ProjectQueries = {
    getProjects: async (): Promise<Project[]> => {
        return await getProjects()
    },
    getProject: async (_: ParentNode, id: number): Promise<Project> => {
        return await getProject(id)
    }
}

export const ProjectMutations = {
    createProject: async (_: ParentNode, project: ProjectInput): Promise<Project> => {
        return await createProject(project)
    },
    updateProject: async (_: ParentNode, project: ProjectInput): Promise<Project> => {
        return await updateProject(project)
    },
    deleteProject: async (_: ParentNode, id: number): Promise<Project> => {
        return await deleteProject(id)
    }
}
