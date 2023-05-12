import LOGGER from '@config/logger';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const projectNode = await prisma.project.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: "Node JS Project",
            description: "Node JS Project Description",
            tasks: {
                create: [
                    {
                        name: "Task 1",
                        description: "Task 1 Description",
                        status: "TODO",
                        completed: false
                    },
                    {
                        name: "Task 2",
                        description: "Task 2 Description",
                        status: "TODO",
                        completed: false
                    }
                ],
            },
        },
    })
    const projectPython = await prisma.project.upsert({
        where: { id: 2 },
        update: {},
        create: {
            name: "Python Project",
            description: "Python Project Description",
            tasks: {
                create: [
                    {
                        name: "Task 1",
                        description: "Task 1 Description",
                        status: "TODO",
                        completed: false
                    },
                    {
                        name: "Task 2",
                        description: "Task 2 Description",
                        status: "TODO",
                        completed: false
                    }
                ],
            },
        },
    })
    LOGGER.debug.info({ projectNode, projectPython })
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    LOGGER.debug.error(e)
    await prisma.$disconnect()
})