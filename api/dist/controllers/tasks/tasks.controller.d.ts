import { TasksService } from 'src/services/tasks/tasks.service';
import { CreateTaskDto, EditTaskDto } from 'src/interfaces/tasksInterface';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto): Promise<void>;
    getAll(): Promise<{
        id: number;
        taskName: string;
        status: boolean;
    }[]>;
    updateTask(editTaskDto: EditTaskDto): Promise<void>;
    taskDone(id: string): Promise<void>;
    deleteTask(id: string): Promise<void>;
}
