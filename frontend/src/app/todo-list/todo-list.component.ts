import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { HttpClientModule, HttpErrorResponse, HttpClient, HttpEvent } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface DataGetAll{
  id: number,
  name: string,
  status: boolean
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [ ReactiveFormsModule, NgFor, NgIf, HttpClientModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit{

  host = 'http://localhost:3000';
  taskName = new FormControl('');
  tasks: DataGetAll[] | undefined = [];

  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    this.loadTasks().then(
      (tasks: any) => {
        this.tasks = tasks as DataGetAll[];
      }
    ).catch (
      (error: HttpErrorResponse) => {
        console.error('Erro ao carregar as tarefas:', error);
      }
    )
    console.log(this.tasks)
  }

  loadTasks() {
    const data = this.http.get(`${this.host}/tasks/get`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao carregar as tarefas:', error);
        return throwError(() => error);
      })
    );

    return lastValueFrom(data)

  }

  async createTask(taskName: any) {
    const dataTask = {
      "taskName": taskName
    }

    const data = this.http.post(`${this.host}/tasks/create`, dataTask).pipe(
      catchError(this.handleHttpError)
    )

    return lastValueFrom(data)
  }

  editTask(id: number, taskName: string) {
    const dataUpdate = {
      "id": id,
      "name": taskName,
      "status": false
  }

    return this.http.put(`${this.host}/tasks/put`, dataUpdate).pipe(
      catchError(this.handleHttpError)
    );
  }

  checkTask(id: number) {
    return this.http.patch(`${this.host}/tasks/done/${id}`, {}).pipe(
      catchError(this.handleHttpError)
    );
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.host}/tasks/delete/${id}`).pipe(
      catchError(this.handleHttpError)
    );
  }

  private handleHttpError(error: HttpErrorResponse) {
    console.error('Erro na solicitação HTTP:', error);
    return throwError(() => error);
  }
}
