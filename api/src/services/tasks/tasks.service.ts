import { Tasks } from '@prisma/client';
import { CreateTaskDto } from './../../interfaces/tasksInterface';
import { Injectable } from '@nestjs/common';
import { CreateDataError } from 'src/errors/validationErros';
import { TasksRepository } from 'src/repository/tasks-repository';

interface dataEdit {
  id: number
  taskName: string
  status: boolean
}

interface dateCreate {
    taskName: string,
    status: boolean
}

@Injectable()
export class TasksService {
    constructor(
        private task: TasksRepository
    ){}


    async getAllTasks(){
        try {
            return await this.task.getAllTasks()       
        } catch(err) {
            throw err
        };
    };

    async editTask(data: dataEdit){


        const data_put = {
            taskName: data.taskName,
            status: data.status
        }


        try {
            await this.task.editTask(data.id, data_put)
            
        } catch(err) {
            throw err
        };
    };

    async createTask(createTaskDto: CreateTaskDto): Promise<Tasks> {
        let data: dateCreate;

        try {
            const taskName = createTaskDto.taskName

            data = {
                taskName: taskName,
                status: false
            }
        } catch {
            throw new CreateDataError('/backend/src/services/tasks/tasks.service.ts, createTask')
        };

        try {
            const task = await this.task.createTask(data)

            return task
        } catch(err) {
            throw err
        };
    }

    async deleteTask(task_id: string) {
        let id: number
        
        try {
            id = parseInt(task_id)
        } catch(err) {
            throw err
        };

        try {
            await this.task.deleteTask(id)
            
        } catch(err) {
            throw err
        };
    }

    async taskDone(task_id: string) {
        let id: number
        
        try {
            id = parseInt(task_id)
        } catch(err) {
            throw err
        };

        try {
            await this.task.taskDone(id)
            
        } catch(err) {
            throw err
        };
    }
}
