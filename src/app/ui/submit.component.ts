
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-submit',
  standalone:true,
  template: `
  <div class="flex items-center justify-center">
   <input (keyup.enter)="Submit.emit(k.value); k.value=''" type="text" class="border-b blue-b-orange-400 outline-none" #k/>
   <button (click)="Submit.emit(k.value); k.value=''" class="border border-blue-400 ml-4 px-4">Dodaj Zadanie</button>
</div>
  `,
  styles: []
})
export class SubmitComponent {
  @Output() Submit = new EventEmitter<string>();
}
