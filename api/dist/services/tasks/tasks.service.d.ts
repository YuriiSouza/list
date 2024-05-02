import { Tasks } from '@prisma/client';
import { CreateTaskDto } from './../../interfaces/tasksInterface';
import { TasksRepository } from 'src/repository/tasks-repository';
interface dataEdit {
    id: number;
    taskName: string;
    status: boolean;
}
export declare class TasksService {
    private task;
    constructor(task: TasksRepository);
    getAllTasks(): Promise<{
        id: number;
        taskName: string;
        status: boolean;
    }[]>;
    editTask(data: dataEdit): Promise<void>;
    createTask(createTaskDto: CreateTaskDto): Promise<Tasks>;
    deleteTask(task_id: string): Promise<void>;
    taskDone(task_id: string): Promise<void>;
}
export {};
