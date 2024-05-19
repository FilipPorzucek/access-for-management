import { Component,inject, } from '@angular/core';
import { RemoveItemButton } from '../../../ui/remove-item-button.component';
import { AutosizeTextareaComponent } from '../../../ui/autosize-textarea.component';
import { Task } from '../../model/Task';
import { Input,Output } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { EventEmitter } from '@angular/core';
import { TaskPayload, TaskService } from '../../data-acces/tasks.service';
import { NgIf } from '@angular/common';
import { interval } from 'rxjs';


@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [RemoveItemButton,AutosizeTextareaComponent,NgIcon,NgIf],
  template: `<div class="rounded-md shadow-md p-4 block" [class.bg-blue-400]="task.done" >
  <button 
  class="w-full"
            (click)="!editMode && handleSingleClick()  "
            (dblclick)="switchToEditMode()"

  >
  <header class="flex justify-end">
  <app-remove-item-button (confirm)="delete.emit()"/>
      </header>
      <section class="text-left">  
      <app-autosize-textarea
                *ngIf="editMode; else previewModeTemplate"
                (keyup.escape)="editMode = false"
                (Submit)="updateTaskName( $event)"
                [value]="task.name"
              />       

        <ng-template #previewModeTemplate>
          <span [class.line-through]="task.done" >
            {{ task.name }} - {{ task.dueTime }}{{':00'}}          
          </span>
        </ng-template>
       
      </section>
 
  </button>
</div>

`,

})
export class TaskCardComponent {
  @Input({required:true})task!: Task;
  @Output() update=new EventEmitter< TaskPayload>();
  @Output() delete=new EventEmitter<void>();
  
  removeMode = false;
    editMode = false;
  
  taskOnEditId:number | null=null;
  
    isSingleClick = true;
  
    private taskService=inject(TaskService)
  

  
    updateTaskName( updatedName:string){
  
      this.update.emit({name: updatedName});
  
  
      this.editMode=false;
     
  
    }

 

 
   
    ngOnInit(){
    
      interval(1000 * 60)
    
    }

    
  goodTime: boolean = true;
  
  timePassed() {
    if (!this.task.dueTime) {
      this.goodTime = true;
    } else {
      const dueTime = this.task.dueTime.toString();
      const currentTime = new Date();
      const currentHours = currentTime.getHours();
      const currentMinutes = currentTime.getMinutes();
      
      const dueTimeSplit = dueTime.split(':');
      const dueHours = parseInt(dueTimeSplit[0]);
      const dueMinutes = parseInt(dueTimeSplit[1]);
      
      if (dueHours > currentHours || (dueHours === currentHours && dueMinutes > currentMinutes)) {
        this.goodTime = true; 
      } else {
        this.goodTime = false; 
      }
    

    }
  }
    
  
handleSingleClick() {
  this.timePassed(); 
  if (!this.goodTime) {
    return ; 
  }

  this.isSingleClick = true;

  setTimeout(() => {
    if (this.isSingleClick) {
      this.update.emit({ done: !this.task.done });
    }
    this.isSingleClick = false; 
  }, 150);
}

  
    switchToEditMode() {
      this.isSingleClick = false;
      this.editMode = true;
   
    }
  
  }
  
