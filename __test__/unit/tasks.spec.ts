import { prismaMock } from "@root/prisma/singleton"
import { createTask, getProjectOfTask, updateTask, Status, deleteTask } from "@app/tasks/controller"

test('should create new task', async () => {
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

    prismaMock.task.create.mockResolvedValue(task)
    await expect(createTask(task)).resolves.toEqual({
        id: 1,
        name: "Test Task",
        description: "Test Description",
        status: Status.TODO,
        completed: false,
        projectId: 1,
        updatedAt: task.updatedAt,
        createdAt: task.createdAt
    })
})

test('should throw error when creating new task', async () => {
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
    prismaMock.task.create.mockRejectedValue(new Error("Error creating task"))
    await expect(createTask(task)).rejects.toThrow("Error creating task")
})

test('should get project of task', async () => {
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
    const project = {
        id: 1,
        name: "Test Project",
        description: "Test Description",
        tasks: [],
        updatedAt: new Date(),
        createdAt: new Date()
    }
    prismaMock.project.findUnique.mockResolvedValue(project)
    await expect(getProjectOfTask(task.id)).resolves.toEqual({
        id: 1,
        name: "Test Project",
        description: "Test Description",
        tasks: [],
        updatedAt: project.updatedAt,
        createdAt: project.createdAt
    })
})

test('should update task', async () => {
    const task = {
        id: 1,
        name: "Test Task Updated",
        description: "Test Description Updated",
        status: Status.TODO,
        completed: false,
        projectId: 1,
        updatedAt: new Date(),
        createdAt: new Date()
    }
    prismaMock.task.update.mockResolvedValue(task)
    await expect(updateTask(task)).resolves.toEqual({
        id: 1,
        name: "Test Task Updated",
        description: "Test Description Updated",
        status: Status.TODO,
        completed: false,
        projectId: 1,
        updatedAt: task.updatedAt,
        createdAt: task.createdAt
    })
})

test('should delete task', async () => {
    const task = {
        id: 1,
        name: "Test Task deleted",
        description: "Test Description deleted",
        status: Status.TODO,
        completed: false,
        projectId: 1,
        updatedAt: new Date(),
        createdAt: new Date()
    }
    prismaMock.task.delete.mockResolvedValue(task)
    await expect(deleteTask(task.id)).resolves.toEqual({
        id: 1,
        name: "Test Task deleted",
        description: "Test Description deleted",
        status: Status.TODO,
        completed: false,
        projectId: 1,
        updatedAt: task.updatedAt,
        createdAt: task.createdAt
    })
})