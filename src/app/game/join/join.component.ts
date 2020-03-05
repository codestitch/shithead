import { Component } from '@angular/core';
import { RoomApiService } from 'src/app/services/room-api.service';
import { BaseComponent } from 'src/app/services/base-component';
import { Observable } from 'rxjs';
import { RoomAvailable, Room } from 'colyseus.js/lib/Room';
import { RoomMetadata } from 'src/app/services/models/room-metadata';
import { Router } from '@angular/router';

@Component({
   selector: 'xh-join',
   templateUrl: './join.component.html',
   styleUrls: ['./join.component.scss']
})
export class JoinComponent extends BaseComponent {
   rooms$: Observable<RoomAvailable<RoomMetadata>>;

   constructor(private router: Router, private roomApi: RoomApiService) {
      super();

      this.rooms$ = this.roomApi.availableRooms();
   }

   join(room: RoomAvailable<RoomMetadata>) {
      this.roomApi.join(room.roomId, 'Amazing Player name').subscribe(id => {
         console.log(id);
         this.router.navigate([`/game/play/${id}`]);
      });
   }
}
