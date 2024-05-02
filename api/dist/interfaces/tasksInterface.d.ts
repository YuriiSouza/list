export interface CreateTaskDto {
    taskName: string;
}
export interface EditTaskDto {
    id: number;
    taskName: string;
    status: boolean;
}
