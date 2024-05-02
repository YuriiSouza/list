export class GetAllTasksError extends Error {
    constructor() {
        super('Cant get all tasks.')
    }
}

export class EditTaskError extends Error {
    constructor(id: number) {
        super(`Cant edit this task. ID: ${id}`)
    }
}

export class CreateTaskError extends Error {
    constructor() {
        super('Cant create the task.')
    }
}

export class DeleteTaskError extends Error {
    constructor(id: number) {
        super(`Cant delete the task. ID: ${id}`)
    }
}