import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/services/base-component';
import { Observable } from 'rxjs';
import { RoomAvailable } from 'colyseus.js/lib/Room';
import { Router } from '@angular/router';
import { RoomMetadata } from '../services/models';
import { RoomService } from '../services/room.service';

@Component({
   selector: 'xh-join',
   templateUrl: './join.component.html',
   styleUrls: ['./join.component.scss']
})
export class JoinComponent extends BaseComponent {
   rooms$: Observable<RoomAvailable<RoomMetadata>>;
   TEMP_NAMES = ['Jugo', 'Janyele', 'Jaylan', 'JayBey'];

   constructor(private router: Router, private roomApi: RoomService) {
      super();

      this.rooms$ = this.roomApi.availableRooms();
   }

   join(room: RoomAvailable<RoomMetadata>) {
      const index = Math.floor(Math.random() * this.TEMP_NAMES.length) + 1;
      this.roomApi
         .join(room.roomId, this.TEMP_NAMES[index])
         .subscribe(id => this.router.navigate([`/game/play/${id}/joiner`]));
   }
}
