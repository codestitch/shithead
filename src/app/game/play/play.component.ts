import { Component } from '@angular/core';
import * as Colyseus from 'colyseus.js';
import { BaseComponent } from 'src/app/services/base-component';
import { RoomService } from '../services/room.service';
import { StateAction, Player } from '../services/models';
import { ToArray } from 'src/app/services/util';
import { ActivatedRoute } from '@angular/router';
import {
   catchError,
   map,
   tap,
   defaultIfEmpty,
   debounceTime
} from 'rxjs/operators';

@Component({
   selector: 'xh-play',
   templateUrl: './play.component.html',
   styleUrls: ['./play.component.scss']
})
export class PlayComponent extends BaseComponent {
   isCreator = false;
   ownSessionId: string;
   opponentSessionIds: string[] = [];
   players: { [id: string]: Player } = {};
   room: Colyseus.Room;
   client = new Colyseus.Client('ws://localhost:3000');
   playPile = [];

   constructor(private roomApi: RoomService, private route: ActivatedRoute) {
      super();

      this.onInit$.subscribe(() => {
         this.isCreator =
            this.route.snapshot.paramMap.get('status') === 'creator';

         this.roomApi.room$.pipe(debounceTime(100)).subscribe(
            roomData => {
               if (roomData) {
                  console.log('Players', roomData);
                  this.room = roomData;
                  this.ownSessionId = roomData.sessionId;

                  this.players[roomData.sessionId] = new Player(
                     roomData.sessionId,
                     roomData.state.players[roomData.sessionId].name
                  );
                  this.createExistingPlayers(roomData.state.players.toJSON());

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
                        const roomSession = JSON.parse(
                           localStorage.getItem('room')
                        );
                        const newStatus = { ...roomSession, isActive: false };
                        localStorage.setItem('room', newStatus);
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
                        this.opponentSessionIds = this.opponentSessionIds.filter(
                           x => x !== sessionId
                        );
                        delete this.players[sessionId];
                     };

                     this.room.state.players.onChange = (player, sessionId) => {
                        console.log('ONCHANGE', player, sessionId);
                        this.players[sessionId] = this.players[
                           sessionId
                        ].setCards(
                           ToArray(player.hands),
                           ToArray(player.blinds),
                           ToArray(player.trumps)
                        );
                     };
                  }
               } else this.roomApi.reconnect();
            },
            err => {
               debugger;
            }
         );

         this.onDestroy$.subscribe(() => {
            this.room.leave();
         });
      });
   }

   createExistingPlayers(players: { [id: string]: any }) {
      const existingIds = [...this.opponentSessionIds, this.ownSessionId];
      const ids = Object.keys(players).filter(x => !existingIds.includes(x));
      ids.forEach(id => {
         this.players[id] = new Player(id, players[id].name);
      });
      this.opponentSessionIds = [...this.opponentSessionIds, ...ids];
   }

   start() {
      this.room.send({ action: StateAction.START });
   }

   draw() {
      this.room.send({
         action: StateAction.DRAW,
         data: {
            count: 2
         }
      });
   }

   setTrump() {
      this.room.send({
         action: StateAction.TRUMP,
         data: {
            cards: ''
         }
      });
   }

   playAdd(event) {
      console.log('play Add', event);
   }

   playChange(event) {
      console.log('play Changed', event);
   }

   playRemove(event) {
      console.log('play Removed', event);
   }

   playUpdate(event) {
      console.log('play Update', event);
   }

   playerAdd(event) {
      console.log('Player Add', event);
   }

   playerChange(event) {
      console.log('Player Changed', event);
   }

   playerRemove(event) {
      console.log('Player Removed', event);
   }

   playerUpdate(event) {
      console.log('Player Update', event);
   }
}
