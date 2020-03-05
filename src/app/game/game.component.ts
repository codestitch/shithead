import { Component, OnInit } from '@angular/core';
import { RoomService } from './services/room.service';

@Component({
   selector: 'xh-game',
   templateUrl: './game.component.html',
   styleUrls: ['./game.component.scss'],
   providers: [RoomService]
})
export class GameComponent implements OnInit {
   constructor() {
   }

   ngOnInit(): void {}
}
