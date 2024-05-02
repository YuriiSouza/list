"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const validationErros_1 = require("../../errors/validationErros");
const tasks_repository_1 = require("../../repository/tasks-repository");
let TasksService = class TasksService {
    constructor(task) {
        this.task = task;
    }
    async getAllTasks() {
        try {
            return await this.task.getAllTasks();
        }
        catch (err) {
            throw err;
        }
        ;
    }
    ;
    async editTask(data) {
        const data_put = {
            taskName: data.taskName,
            status: data.status
        };
        try {
            await this.task.editTask(data.id, data_put);
        }
        catch (err) {
            throw err;
        }
        ;
    }
    ;
    async createTask(createTaskDto) {
        let data;
        try {
            const taskName = createTaskDto.taskName;
            data = {
                taskName: taskName,
                status: false
            };
        }
        catch {
            throw new validationErros_1.CreateDataError('/backend/src/services/tasks/tasks.service.ts, createTask');
        }
        ;
        try {
            const task = await this.task.createTask(data);
            return task;
        }
        catch (err) {
            throw err;
        }
        ;
    }
    async deleteTask(task_id) {
        let id;
        try {
            id = parseInt(task_id);
        }
        catch (err) {
            throw err;
        }
        ;
        try {
            await this.task.deleteTask(id);
        }
        catch (err) {
            throw err;
        }
        ;
    }
    async taskDone(task_id) {
        let id;
        try {
            id = parseInt(task_id);
        }
        catch (err) {
            throw err;
        }
        ;
        try {
            await this.task.taskDone(id);
        }
        catch (err) {
            throw err;
        }
        ;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [tasks_repository_1.TasksRepository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map