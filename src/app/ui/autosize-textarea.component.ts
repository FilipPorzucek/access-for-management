import { Component, Input, Output} from '@angular/core';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-autosize-textarea',
  standalone: true,
  template: `
  <textarea
  #textarea
  [placeholder]="placeholder"
  [value]="value"
  class="focus:outline-orange-400 w-full"
  (click)="$event.stopPropagation()"
(keyup.enter)="emit(textarea)"
  (input)="calcHeightArea(textarea)"

  >

  </textarea>
  
  `,
  styles:[],
 
})
export class AutosizeTextareaComponent {

  @Input() placeholder="";
  @Input() value="";
@Input() clearAfterEmit=false;

  @Output() Submit=new EventEmitter<string>();

  protected emit(textarea: HTMLTextAreaElement){

        this.Submit.emit(textarea.value); 

        if(this.clearAfterEmit){
          textarea.value=''; 
        }

  }

calcHeightArea(textarea:HTMLTextAreaElement){
  textarea.style.height=textarea.scrollHeight+'px';
}
}
