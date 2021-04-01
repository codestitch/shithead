import { Component, OnInit } from '@angular/core';
import { GameService, RoomService } from './services';
import { StatelogService } from './services/statelog.service';

@Component({
   selector: 'xh-game',
   templateUrl: './game.component.html',
   styleUrls: ['./game.component.scss'],
   providers: [RoomService, GameService, StatelogService]
})
export class GameComponent implements OnInit {
   constructor() {
   }

   ngOnInit(): void {}
}
