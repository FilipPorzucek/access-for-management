import { Component } from '@angular/core';
import { TaskListPageComponent } from './task/task-list.page.component';




@Component({
  selector: 'app-root',
  standalone:true,
  imports:[TaskListPageComponent],
  template: `
    <h1 class="text-blue-600 uppercase py-4 text-2xl text-center">Lista Zadań LOlodzik 2024</h1>
    <main class="grid place-items-center pt-4">
      <app-task-list-page class="w-1/2"/>
    </main>

    `,
    })
    export class AppComponent {}