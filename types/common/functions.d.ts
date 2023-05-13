export type GetProjects = () => Promise<Project[]>
export type GetProject = (id: number) => Promise<Project>
export type CreateProject = (project: ProjectInput) => Promise<Project>
export type UpdateProject = (project: ProjectInput) => Promise<Project>
export type DeleteProject = (id: number) => Promise<Project>
export type GetTasks = () => Promise<Task[]>
export type GetTask = (id: number) => Promise<Task>
export type CreateTask = (task: TaskInput) => Promise<Task>
export type UpdateTask = (task: TaskInput) => Promise<Task>
export type DeleteTask = (id: number) => Promise<Task>
export type GetProjectOfTask = (id: number) => Promise<Project | null>
export type GetTasksOfProject = (projectId: number) => Promise<Task[]>