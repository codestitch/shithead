import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base-service';
import { Observable, BehaviorSubject } from 'rxjs';
import { RoomService } from './room.service';
import { Player, RoomPlayerState, RoomMessageState } from './models';
import { shareReplay, debounceTime, tap, map } from 'rxjs/operators';
import { ToArray } from 'src/app/services/util';
import { Room } from 'colyseus.js';

@Injectable()
export class GameService extends BaseService {
   playerSessionId: string;
   opponentSessionIds: string[] = [];
   players$: Observable<{ [id: string]: Player }>;
   gameRoom$: Observable<any>;

   private _players$ = new BehaviorSubject<{ [id: string]: Player }>({});

   constructor(private roomService: RoomService) {
      super();

      this.players$ = this._players$.asObservable();

      this.gameRoom$ = this.roomService.room$;
      this.gameRoom$
         .pipe(
            debounceTime(100),
            map((room: Room) => {
               if (room) {
                  this.setPlayer(
                     room.state.players[room.sessionId],
                     room.sessionId
                  );

                  this.createExistingPlayers(room.state.players.toJSON());

                  room.onStateChange(state => {
                     console.log(
                        '%c%cON STATE CHANGE ONCE:',
                        'color: green',
                        state
                     );
                  });

                  room.onStateChange.once(state => {
                     console.log('%cON STATE CHANGE:', 'color: green', state);
                  });

                  room.onLeave(code => {
                     console.log('%cON LEAVE', 'color: green', code);
                     this.leaveRoom();
                  });

                  room.onMessage(message => {
                     console.log('%cON MESSAGE', 'color: green', message);
                  });

                  room.onError(message => {
                     console.log('%cON ERROR', 'color: green', message);
                  });

                  room.state.players.onChange = (player, sessionId) => {
                     console.log(
                        '%cONCHANGE',
                        'color: green',
                        player,
                        sessionId
                     );
                     this.updatePlayer(player, sessionId);
                  };

                  room.state.players.onAdd = (player, sessionId) => {
                     console.log('%cONADD', 'color: green', player, sessionId);
                  };

                  room.state.players.onRemove = (player, sessionId) => {
                     console.log(
                        '%cONREMOVE',
                        'color: green',
                        player,
                        sessionId
                     );
                  };
               } else this.roomService.reconnect();
            }),
            shareReplay(1)
         )
         .subscribe();

      this.onDestroy$.subscribe(() => {
         this._players$.complete();
      });
   }

   send(message: RoomMessageState) {
      this.gameRoom$.pipe(tap(room => room.send(message))).subscribe();
   }

   setPlayer(state: RoomPlayerState, sessionId: string) {
      this.playerSessionId = sessionId;
      const players = this._players$.getValue();
      players[sessionId] = new Player(
         sessionId,
         state.name,
         state.hands,
         state.blinds,
         state.trumps
      );
      this._players$.next(players);
   }

   updatePlayer(player: RoomPlayerState, sessionId: string) {
      const players = this._players$.getValue();
      players[sessionId] = new Player(
         sessionId,
         name,
         player.hands,
         player.blinds,
         player.trumps
      );
      this._players$.next(players);
   }

   addPlayer(player: RoomPlayerState, sessionId: string) {
      const players = this._players$.getValue();
      if (!players[sessionId]) {
         this.opponentSessionIds = [...this.opponentSessionIds, sessionId];
         players[sessionId] = new Player(
            sessionId,
            player.name,
            player.hands,
            player.blinds,
            player.trumps
         );
         this._players$.next(players);
      }
   }

   removePlayer(sessionId: string) {
      const players = this._players$.getValue();
      this.opponentSessionIds = this.opponentSessionIds.filter(
         x => x !== sessionId
      );
      delete players[sessionId];
      this._players$.next(players);
   }

   leaveRoom() {
      const roomSession = JSON.parse(localStorage.getItem('room'));
      const newStatus = { ...roomSession, isActive: false };
      localStorage.setItem('room', newStatus);
   }

   createExistingPlayers(playerList: { [id: string]: any }) {
      const players = this._players$.getValue();
      const existingIds = [...this.opponentSessionIds, this.playerSessionId];
      const ids = Object.keys(playerList).filter(x => !existingIds.includes(x));
      ids.forEach(id => {
         players[id] = new Player(id, playerList[id].name);
      });
      this.opponentSessionIds = [...this.opponentSessionIds, ...ids];
   }
}
