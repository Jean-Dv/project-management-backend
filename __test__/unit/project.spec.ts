import { prismaMock } from "@root/prisma/singleton";
import { createProject } from "@app/project/controller";

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