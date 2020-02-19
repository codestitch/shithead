import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../services/models';
import { GameService } from './services/game.service';
import { Player } from './models/player';
import { CardService } from '../services/card.service';

@Component({
   selector: 'xh-game',
   templateUrl: './game.component.html',
   styleUrls: ['./game.component.scss'],
   providers: [GameService, CardService]
})
export class GameComponent implements OnInit {
   playerCount = 2;
   players$: Observable<Player[]>;
   cards$: Observable<Card[]>;
   constructor(private gameService: GameService) {
      this.gameService.playerCount = this.playerCount;
      this.gameService.play();
      this.players$ = this.gameService.players$;
   }

   ngOnInit(): void {}
}
