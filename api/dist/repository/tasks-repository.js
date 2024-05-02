"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksRepository = void 0;
const prisma_1 = require("./lib/prisma");
class TasksRepository {
    async getAllTasks() {
        const tasks = await prisma_1.prisma.tasks.findMany();
        return tasks;
    }
    ;
    async editTask(id, data) {
        await prisma_1.prisma.tasks.update({
            where: {
                id
            },
            data
        });
    }
    ;
    async createTask(data) {
        const task = await prisma_1.prisma.tasks.create({
            data
        });
        return task;
    }
    ;
    async deleteTask(id) {
        await prisma_1.prisma.tasks.delete({
            where: {
                id: id
            },
        });
    }
    ;
    async taskDone(id) {
        await prisma_1.prisma.tasks.update({
            where: {
                id
            },
            data: { status: true }
        });
    }
}
exports.TasksRepository = TasksRepository;
//# sourceMappingURL=tasks-repository.js.map