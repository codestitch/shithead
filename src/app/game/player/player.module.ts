import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { BlindComponent } from './blind/blind.component';
import { HandComponent } from './hand/hand.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CardModule } from 'src/app/components/card/card.module';
import { DeckModule } from 'src/app/components/deck/deck.module';

@NgModule({
   declarations: [PlayerComponent, BlindComponent, HandComponent],
   imports: [CommonModule, DragDropModule, CardModule, DeckModule],
   exports: [PlayerComponent, BlindComponent, HandComponent]
})
export class PlayerModule {}
