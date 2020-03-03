import { Component, OnInit } from '@angular/core';
import { GameService } from './services/game.service';

@Component({
   selector: 'xh-game',
   templateUrl: './game.component.html',
   styleUrls: ['./game.component.scss'],
   providers: [GameService]
})
export class GameComponent implements OnInit {
   constructor() {
   }

   ngOnInit(): void {}
}
