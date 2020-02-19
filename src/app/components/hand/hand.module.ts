import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HandComponent } from './hand.component';
import { CardModule } from '../card/card.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
   declarations: [HandComponent],
   imports: [CommonModule, CardModule, DragDropModule],
   exports: [HandComponent]
})
export class HandModule {}
