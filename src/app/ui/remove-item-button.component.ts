import { Component } from '@angular/core';
import { NgIconComponent } from "@ng-icons/core";
import { NgIf } from '@angular/common';
import { provideIcons } from "@ng-icons/core";
import {featherTrash2, featherUser,featherCheck,featherX,} from "@ng-icons/feather-icons";
import { Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-remove-item-button',
  standalone: true,
  imports: [ NgIconComponent,NgIf],
  viewProviders: [provideIcons({ featherTrash2, featherUser, featherCheck, featherX })],
  styles: [
    `
      .icon--hover {
        @apply hover:text-red-700 hover:rounded-full;
      }
    `,
  ],
  template:`
  <div
      (click)="removeMode && $event.stopPropagation()"
     [class.bg-red-700]="removeMode"
     [class.text-white]="removeMode"
    >
      <span 
      [class.invisible]="!removeMode"
      [class.bg-red-700]="removeMode"
      class="text-sm transition-transform duration-300  pl-2 rounded-md"
    >
    Are you sure ?
        </span>

      <button
        *ngIf="!removeMode"
        (click)="removeMode = true; $event.stopPropagation()"
       
  >
  <ng-icon name="featherTrash2" class="icon--hover" />

  </button>
  <button *ngIf="removeMode"
(click)="removeMode=false; $event.stopPropagation()"


>
  <ng-icon name="featherX" class="hover:bg-white icon--hover"/>

  </button>

  <button *ngIf="removeMode"
  (click)="confirm.emit(); removeMode=false; $event.stopPropagation() "
>
<ng-icon name="featherCheck" class="hover:bg-white icon--hover" />
  </button>

  </div>
  
  `,


})
export class RemoveItemButton {

  @Output() confirm = new EventEmitter<void>();

  removeMode = false;

}
