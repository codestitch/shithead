import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomApiService } from 'src/app/services/room-api.service';
import { RoomMetadata } from 'src/app/services/models/room-metadata';

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

   constructor(private router: Router, private roomApi: RoomApiService) {}

   ngOnInit(): void {}

   create() {
      this.roomApi.create(this.room).subscribe(id => {
         console.log(id);
         this.router.navigate([`/game/play/${id}`]);
      });
   }

   choose(ev) {
      console.log(ev);
   }
}
