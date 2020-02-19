import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GameRoutingModule } from './game-routing.module';
import { HandModule } from '../components/hand/hand.module';
import { MultiDragModule } from '../components/multi-drag/multi-drag.module';
import { CardModule } from '../components/card/card.module';

@NgModule({
   declarations: [GameComponent],
   imports: [
      CommonModule,
      GameRoutingModule,
      DragDropModule,
      HandModule,
      CardModule,
      MultiDragModule
   ]
})
export class GameModule {}
