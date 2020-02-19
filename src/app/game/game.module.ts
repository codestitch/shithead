import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { GameRoutingModule } from './game-routing.module';
import { CardModule } from '../components/card/card.module';
import { PlayerModule } from './player/player.module';

@NgModule({
   declarations: [GameComponent],
   imports: [
      CommonModule,
      GameRoutingModule,
      PlayerModule,
      CardModule,
   ]
})
export class GameModule {}
