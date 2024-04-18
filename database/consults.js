import { Task, createTasksTable } from './db';

export class Consults extends Task {
  async insertTask(task) {
    const { name } = task;
    await Task.query().insert({ name });
  }

  async deleteTask(id) {
    await Task.query().delete().where('id', id);
  }

  async getAllTasks() {
    await createTasksTable();
    return await Task.query();
  }

  async updateTask(taskId, updatedData) {
    await Task.query().findById(taskId).patch(updatedData);
  }

  async checkTask(taskId) {
    await Task.query().findById(taskId).patch({ status: true });
  }

  async taskExists(taskId) {
    return await Task.query().findById(taskId);
  }
}
