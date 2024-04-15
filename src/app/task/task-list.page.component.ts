import { Component, inject } from "@angular/core";
import { tasksListComponent } from "./ui/tasks-list.component";
import { SubmitComponent } from "../ui/submit.component";
import { Task } from "./model/Task";
import { NgIf } from "@angular/common";
import { application, response } from "express";
import { ComponentListState } from "../utils/list-state.type";
import { fetchingError } from "../utils/list-state.type";
import { TaskService } from "./data-acces/tasks.service";
import { Inject } from "@angular/core";
import { take } from "rxjs";


@Component({
  selector: "app-task-list-page",
  standalone: true,
  imports: [tasksListComponent, SubmitComponent, NgIf],
  template: `
<app-submit (Submit)= "listState.state === 'succes'&& addTask($event, listState.results) "/>
  
    <app-tasks-list *ngIf="listState.state === 'succes'" 
    class="block mt-4"
    [tasks]="listState.results"/>

<p *ngIf="listState.state === 'error'">{{listState.error.message}}</p>

  <p *ngIf="listState.state === 'loading'">Loading...</p>
 `,
})

export class TaskListPageComponent {


  listState: ComponentListState<Task>={state:'idle',}

  private taskService=inject(TaskService);

  ngOnInit(){
    this.listState={state:"loading"};
    this.taskService.getAll()
    .then((response)=>{
        if(Array.isArray(response)){
          this.listState={
            state:'succes',
            results:response,
          };
        }else{
          this.listState={
            state:"error",
            error:response,
          }
        }
    });

  }

  addTask(name: string, tasks: Task[]) {
    this.taskService.add(name).then((response) => {
        if ("id" in response) {
          this.listState = {
            state:'succes',
            results: tasks.concat(response),
          };
        } else {
          alert(response.message);
        }
      });
    }
  }



  