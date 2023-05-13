import { Task, TaskInput, Project } from 'types/common/interfaces.d'
import { getTasks, getTask, createTask, updateTask, deleteTask, getProjectOfTask } from './controller'

export const TaskQueries = {
    tasks: async (): Promise<Task[]> => {
        return await getTasks()
    },
    task: async (_: ParentNode, id: number): Promise<Task> => {
        return await getTask(id)
    }
}

export const TaskMutations = {
    createTask: async (_: ParentNode, task: TaskInput): Promise<Task> => {
        return await createTask(task)
    },
    updateTask: async (_: ParentNode, task: TaskInput): Promise<Task> => {
        return await updateTask(task)
    },
    deleteTask: async (_: ParentNode, id: number): Promise<Task> => {
        return await deleteTask(id)
    }
}

export const TaskResolver = {
    project: async (parent: Task): Promise<Project | null> => {
        return await getProjectOfTask(parent.id)
    }
}