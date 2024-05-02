"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTaskError = exports.CreateTaskError = exports.EditTaskError = exports.GetAllTasksError = void 0;
class GetAllTasksError extends Error {
    constructor() {
        super('Cant get all tasks.');
    }
}
exports.GetAllTasksError = GetAllTasksError;
class EditTaskError extends Error {
    constructor(id) {
        super(`Cant edit this task. ID: ${id}`);
    }
}
exports.EditTaskError = EditTaskError;
class CreateTaskError extends Error {
    constructor() {
        super('Cant create the task.');
    }
}
exports.CreateTaskError = CreateTaskError;
class DeleteTaskError extends Error {
    constructor(id) {
        super(`Cant delete the task. ID: ${id}`);
    }
}
exports.DeleteTaskError = DeleteTaskError;
//# sourceMappingURL=tasksErrors.js.map