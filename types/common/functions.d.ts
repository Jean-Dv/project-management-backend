export type GetProjects = () => Promise<Project[]>
export type GetProject = (id: number) => Promise<Project>
export type CreateProject = (project: ProjectInput) => Promise<Project>
export type UpdateProject = (project: ProjectInput) => Promise<Project>
export type DeleteProject = (id: number) => Promise<Project>