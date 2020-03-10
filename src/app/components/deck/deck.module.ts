import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckComponent } from './deck.component';
import { CardModule } from '../card/card.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
   declarations: [DeckComponent],
   imports: [CommonModule, CardModule, DragDropModule],
   exports: [DeckComponent]
})
export class DeckModule {}
