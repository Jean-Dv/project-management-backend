import { prismaMock } from "@root/prisma/singleton";
import { createProject, deleteProject, updateProject, getTasksOfProject } from "@app/project/controller";
import { Status } from "@app/tasks/controller";

test('should create new project', async () => {
    const project = {
        id: 1,
        name: "Test Project",
        description: "Test Description",
        tasks: [],
        updatedAt: new Date(),
        createdAt: new Date()
    }
    prismaMock.project.create.mockResolvedValue(project)
    await expect(createProject(project)).resolves.toEqual({
        id: 1,
        name: "Test Project",
        description: "Test Description",
        tasks: [],
        updatedAt: project.updatedAt,
        createdAt: project.createdAt
    })
})

test('should throw error when creating new project', async () => {
    const project = {
        id: 1,
        name: "Test Project",
        description: "Test Description",
        tasks: [],
        updatedAt: new Date(),
        createdAt: new Date()
    }
    prismaMock.project.create.mockRejectedValue(new Error("Error creating project"))
    await expect(createProject(project)).rejects.toThrow("Error creating project")
})

test('should update project', async () => {
    const project = {
        id: 1,
        name: "Test Project Updated",
        description: "Test Description Updated",
        tasks: [],
        updatedAt: new Date(),
        createdAt: new Date()
    }
    prismaMock.project.update.mockResolvedValue(project)
    await expect(updateProject(project)).resolves.toEqual({
        id: 1,
        name: "Test Project Updated",
        description: "Test Description Updated",
        tasks: [],
        updatedAt: project.updatedAt,
        createdAt: project.createdAt
    })
})

test('should delete project', async () => {
    const project = {
        id: 1,
        name: "Test Project deleted",
        description: "Test Description deleted",
        tasks: [],
        updatedAt: new Date(),
        createdAt: new Date()
    }
    prismaMock.project.delete.mockResolvedValue(project)
    await expect(deleteProject(project.id)).resolves.toEqual({
        id: 1,
        name: "Test Project deleted",
        description: "Test Description deleted",
        tasks: [],
        updatedAt: project.updatedAt,
        createdAt: project.createdAt
    })
})

test('should get tasks of project', async () => {
    const project = {
        id: 1,
        name: "Test Project",
        description: "Test Description",
        tasks: [],
        updatedAt: new Date(),
        createdAt: new Date()
    }
    const task = {
        id: 1,
        name: "Test Task",
        description: "Test Description",
        status: Status.TODO,
        completed: false,
        projectId: 1,
        updatedAt: new Date(),
        createdAt: new Date()
    }
    prismaMock.project.findUnique.mockResolvedValue(project)
    prismaMock.task.findMany.mockResolvedValue([task])
    await expect(getTasksOfProject(project.id)).resolves.toEqual([task])
})