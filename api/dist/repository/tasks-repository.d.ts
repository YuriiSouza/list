import { Prisma, Tasks } from '@prisma/client';
export declare class TasksRepository {
    getAllTasks(): Promise<Tasks[]>;
    editTask(id: number, data: any): Promise<void>;
    createTask(data: Prisma.TasksCreateInput): Promise<Tasks>;
    deleteTask(id: number): Promise<void>;
    taskDone(id: number): Promise<void>;
}
