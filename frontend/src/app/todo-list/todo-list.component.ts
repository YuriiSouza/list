import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { HttpClientModule, HttpErrorResponse, HttpClient, HttpEvent } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface DataGetAll{
  id: number
  taskName: string
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
  taskEdit = new FormControl('');
  tasks: DataGetAll[] | undefined = [];

  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    this.loadTasks().then(
      (tasks: any) => {
        this.tasks = tasks;
        this.tasks?.forEach((task) => {
          console.log(task.id, task.taskName, task.status)
        })
      }
    ).catch (
      (error: HttpErrorResponse) => {
        console.error('Erro ao carregar as tarefas:', error);
      }
    )
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

  createTask() {
    const name = this.taskName.value;
    const dataTask = {
      taskName: name
    };

    this.http.post(`${this.host}/tasks/create`, dataTask).subscribe(
      (response) => {
        console.log('Requisição enviada com sucesso!', response);
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        console.error('Erro na requisição HTTP:', error);
      }
    )
  }

  editTask(id: number) {
    const name = this.taskEdit.value;
    const dataUpdate = {
      "id": id,
      "taskName": name,
      "status": false
  }

    this.http.put(`${this.host}/tasks/put`, dataUpdate).subscribe(
      (response) => {
        console.log('Requisição enviada com sucesso!', response);
      },
      (error: HttpErrorResponse) => {
        console.error('Erro na requisição HTTP:', error);
      }
    )
    
    window.location.reload()
  }

  checkTask(id: number) {
    this.http.patch(`${this.host}/tasks/done/${id}`, {}).subscribe(
      (response) => {
        console.log('Requisição enviada com sucesso!', response);
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        console.error('Erro na requisição HTTP:', error);
      }
    )
  }

  async deleteTask(id: number) {
    this.http.delete(`${this.host}/tasks/delete/${id}`).subscribe(
      (response) => {
        console.log('Requisição enviada com sucesso!', response);
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        console.error('Erro na requisição HTTP:', error);
      }
    )
  }
}
