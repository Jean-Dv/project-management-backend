import { ProjectInput, Project, Task } from 'types/common/interfaces';
import { createProject, deleteProject, getProject, getProjects, updateProject, getTasksOfProject } from './controller';

export const ProjectQueries = {
    projects: async (): Promise<Project[]> => {
        return await getProjects()
    },
    project: async (_: ParentNode, id: number): Promise<Project> => {
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

export const ProjectResolver = {
    tasks: async (parent: Project): Promise<Task[]> => {
        return await getTasksOfProject(parent.id)
    }
}
