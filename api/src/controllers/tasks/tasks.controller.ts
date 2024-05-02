import { TasksService } from 'src/services/tasks/tasks.service';
import { CreateTaskDto, EditTaskDto } from 'src/interfaces/tasksInterface';
import { Controller, Get, Post, Body, Put, Param, Delete, Patch } from '@nestjs/common';


@Controller('tasks')
export class TasksController {
    constructor(
        private tasksService: TasksService
    ) {}

    @Post('create')
    async create(@Body() createTaskDto: CreateTaskDto) {
        await this.tasksService.createTask(createTaskDto)
    };

    @Get('get')
    async getAll() {
        return await this.tasksService.getAllTasks();
    }


    @Put('put')
    async updateTask(@Body() editTaskDto: EditTaskDto) {
        return await this.tasksService.editTask(editTaskDto)
    }

    @Patch('done/:id')
    async taskDone(@Param('id') id: string) {
        return await this.tasksService.taskDone(id)
    }

    @Delete('delete/:id')
    async deleteTask(@Param('id') id: string) {
        await this.tasksService.deleteTask(id)
    }

}
