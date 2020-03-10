import { Component, OnInit } from '@angular/core';
import { GameService, RoomService } from './services';

@Component({
   selector: 'xh-game',
   templateUrl: './game.component.html',
   styleUrls: ['./game.component.scss'],
   providers: [RoomService, GameService]
})
export class GameComponent implements OnInit {
   constructor() {
   }

   ngOnInit(): void {}
}
