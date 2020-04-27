import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../services/room.service';
import { RoomMetadata } from '../services/models';

@Component({
   selector: 'xh-create',
   templateUrl: './create.component.html',
   styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
   room: RoomMetadata = {
      name: 'Test Room',
      deckCount: 1,
      hasJoker: false,
      maxPlayer: 4,
      playerName: 'Amazing Creator'
   };

   constructor(private router: Router, private roomApi: RoomService) {}

   ngOnInit(): void {}

   create() {
      this.roomApi
         .create(this.room)
         .subscribe(id => this.router.navigate([`/game/play/${id}/creator`]));
   }

   choose(ev) {
      console.log(ev);
   }
}
