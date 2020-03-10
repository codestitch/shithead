import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayComponent } from './play.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlayerModule } from '../player/player.module';
import { PlayPileComponent } from './play-pile/play-pile.component';
import { DeckModule } from 'src/app/components/deck/deck.module';
import { CardModule } from 'src/app/components/card/card.module';
import { MultiDragModule } from 'src/app/components/multi-drag/multi-drag.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes: Routes = [
   {
      path: '',
      component: PlayComponent
   }
];

@NgModule({
   declarations: [PlayComponent, PlayPileComponent],
   imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      PlayerModule,
      DeckModule,
      CardModule,
      DragDropModule,
      MultiDragModule
   ]
})
export class PlayModule {}
