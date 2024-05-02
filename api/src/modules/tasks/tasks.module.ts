import { TasksRepository } from './../../repository/tasks-repository';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/repository/main';
import { TasksController } from 'src/controllers/tasks/tasks.controller';
import { TasksService } from 'src/services/tasks/tasks.service';

@Module({
    controllers: [TasksController],
    providers: [TasksService, PrismaService, TasksRepository]
})
export class TasksModule {}
