import { Component, Input, inject } from '@angular/core';
import { Task } from '../model/Task';
import { NgFor,NgIf } from '@angular/common';
import { RemoveItemButton } from '../../ui/remove-item-button.component';
import { TaskPayload, TaskService } from '../data-acces/tasks.service';
import { AutosizeTextareaComponent } from '../../ui/autosize-textarea.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { response } from 'express';



@Component({
  selector: 'app-tasks-list',
  standalone:true,
  imports:[NgFor,RemoveItemButton,NgIf,TaskCardComponent,RemoveItemButton,AutosizeTextareaComponent],
  template: `

  <ul>
    <li *ngFor="let task of tasks" class="mb-2">
    <app-task-card [task]="task" 
       (update)="updateTask(task.id, $event)"
         (delete)="delete(task.id)"/>
    </li>
  </ul>


  `,
  styles:[],
})
export class tasksListComponent {
  @Input({ required: true }) tasks: Task[] = [];



  private taskService=inject(TaskService);




delete(taskId:number){
  this.taskService.delete(taskId).then((response)=>{
    if(response instanceof Error){
      alert(response.message)
    }else{
      this.tasks=this.tasks.filter((task)=>task.id!==taskId)
    }
  })
}

updateTask(taskId: number, updatedTask:TaskPayload){

  this.taskService.update(taskId,updatedTask ).then((response)=>{
    if(response instanceof Error){
      alert(response.message)
    }else{
     this.tasks=this.tasks.map((task)=>{
      if(task.id===response.id){
        return response
      }else{
        return task;
      }
     })
    }
  })


  

}



}





