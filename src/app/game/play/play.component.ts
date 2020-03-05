import { Component } from '@angular/core';
import * as Colyseus from 'colyseus.js';
import { BaseComponent } from 'src/app/services/base-component';
import { RoomService } from '../services/room.service';
import { StateAction } from '../services/models';
import { Player } from '../services/models/player-attribute';
import { ToArray } from 'src/app/services/util';

@Component({
   selector: 'xh-play',
   templateUrl: './play.component.html',
   styleUrls: ['./play.component.scss']
})
export class PlayComponent extends BaseComponent {
   ownSessionId: string;
   opponentSessionIds: string[] = [];
   players: { [id: string]: Player } = {};
   room: Colyseus.Room;
   client = new Colyseus.Client('ws://localhost:3000');
   constructor(private roomApi: RoomService) {
      super();

      this.roomApi.room$.subscribe(x => {
         console.log('Room:', x);
         this.room = x;
         this.ownSessionId = x.sessionId;

         console.log('Players', x.state.players);
         this.players[x.sessionId] = new Player(
            x.sessionId,
            x.state.players[x.sessionId].name
         );
         this.createExistingPlayers(x.state.players.toJSON());
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
            if (!this.players[sessionId]) {
               this.opponentSessionIds = [
                  ...this.opponentSessionIds,
                  sessionId
               ];
               this.players[sessionId] = new Player(
                  sessionId,
                  player.name,
                  ToArray(player.hands),
                  ToArray(player.blinds),
                  ToArray(player.trumps)
               );
            }
         };

         this.room.state.players.onRemove = (player, sessionId) => {
            console.log('ONREMOVE', player, sessionId);
         };

         this.room.state.players.onChange = (player, sessionId) => {
            console.log('ONCHANGE', player, sessionId);
            this.players[sessionId].setCards(
               ToArray(player.hands),
               ToArray(player.blinds),
               ToArray(player.trumps)
            );
         };
      }
   }

   createExistingPlayers(players: { [id: string]: any }) {
      const existingIds = [...this.opponentSessionIds, this.ownSessionId];
      const ids = Object.keys(players).filter(x => !existingIds.includes(x));
      ids.forEach(id => {
         this.players[id] = new Player(id, players[id].name);
      });
      this.opponentSessionIds = [...this.opponentSessionIds, ...ids];
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
