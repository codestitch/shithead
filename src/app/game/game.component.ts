import { Component, OnInit } from '@angular/core';
import { RoomApiService } from '../services/room-api.service';

@Component({
   selector: 'xh-game',
   templateUrl: './game.component.html',
   styleUrls: ['./game.component.scss'],
   providers: [RoomApiService]
})
export class GameComponent implements OnInit {
   constructor() {
   }

   ngOnInit(): void {}
}
