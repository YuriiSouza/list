import { prisma } from "./lib/prisma";
import { Prisma, Tasks } from '@prisma/client'


export class TasksRepository {

    async getAllTasks(): Promise<Tasks[]> {
        const tasks = await prisma.tasks.findMany();

        return tasks;
    };

    async editTask(id: number, data: any) {
        
        await prisma.tasks.update({
            where: {
                id
            },
            data
        });
    };

    async createTask(data: Prisma.TasksCreateInput): Promise<Tasks> {
        const task = await prisma.tasks.create({
            data
        });

        return task;
    };

    async deleteTask(id: number): Promise<void> {
        await prisma.tasks.delete({
            where: {
                id: id
            },
        });
    };

    async taskDone(id: number) {
        await prisma.tasks.update({
            where: {
                id
            },
            data: {status: true}
        })
    }
}