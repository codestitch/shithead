import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiDragComponent } from './multi-drag.component';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [MultiDragComponent],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports: [MultiDragComponent]
})
export class MultiDragModule { }
