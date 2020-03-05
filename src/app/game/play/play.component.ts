import { Component } from '@angular/core';
import * as Colyseus from 'colyseus.js';
import { RoomApiService } from 'src/app/services/room-api.service';
import { BaseComponent } from 'src/app/services/base-component';
import { StateAction } from 'src/app/services/models';

@Component({
   selector: 'xh-play',
   templateUrl: './play.component.html',
   styleUrls: ['./play.component.scss']
})
export class PlayComponent extends BaseComponent {
   players = {};
   room: Colyseus.Room;
   client = new Colyseus.Client('ws://localhost:3000');
   constructor(private roomApi: RoomApiService) {
      super();

      this.onInit$.subscribe(_ => {
         this.roomApi.room$.subscribe(x => {
            console.log('Room:', x);
            this.room = x;
         });

         if (this.room) {
            this.room.onStateChange(state => {
               console.log('ON STATE CHANGE ONCE:', state);
            });

            this.room.onStateChange.once(state => {
               console.log('ON STATE CHANGE:', state);
            });

            this.room.onMessage(message => {
               console.log('ON MESSAGE', message);
            });

            this.room.onError(message => {
               console.log('ON ERROR'), message;
            });

            this.room.onLeave(code => {
               console.log('ON LEAVE', code);
            });

            this.room.state.players.onAdd = (player, sessionId) => {
               console.log('ONADD', player, sessionId);
            };

            this.room.state.players.onRemove = (player, sessionId) => {
               console.log('ONREMOVE', player, sessionId);
            };

            this.room.state.players.onChange = (player, sessionId) => {
               console.log('ONCHANGE', player, sessionId);
            };
         }
      });
   }

   draw() {
      this.room.send({
         action: StateAction.DRAW,
         data: {
            count: 2
         }
      });
   }
}
