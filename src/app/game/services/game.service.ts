import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base-service';
import { Observable, BehaviorSubject } from 'rxjs';
import { RoomService } from './room.service';
import {
   Player,
   RoomPlayerState,
   RoomMessageState,
   StateAction
} from './models';
import { shareReplay, debounceTime, tap, map } from 'rxjs/operators';
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
                  console.log('%cRoom', 'color: green', room);
                  
                  this.setPlayer(
                     room.state.players[room.sessionId],
                     room.sessionId
                  );

                  this.createExistingPlayers(room.state.players.toJSON());

                  room.onStateChange(state => {
                     console.log(
                        '%cON STATE CHANGE ONCE:',
                        'color: green',
                        state
                     );
                  });

                  room.onStateChange.once(state => {
                     console.log('%cON STATE CHANGE:', 'color: green', state);
                  });

                  room.onLeave(code => {
                     console.log('%cON LEAVE', 'color: orange', code);
                     this.leaveRoom();
                  });

                  room.onMessage(message => {
                     console.log('%cON MESSAGE', 'color: green', message);
                  });

                  room.onError(message => {
                     console.log('%cON ERROR', 'color: orange', message);
                  });

                  room.state.players.onChange = (player, sessionId) => {
                     console.log(
                        '%cONCHANGE-PLAYER',
                        'color: green',
                        player,
                        sessionId
                     );
                     this.updatePlayer(player, sessionId);
                  };

                  room.state.players.onAdd = (
                     player: RoomPlayerState,
                     sessionId
                  ) => {
                     console.log(
                        '%cONADD-PLAYER',
                        'color: green',
                        player,
                        sessionId
                     );

                     const players = this._players$.getValue();
                     if (!players[sessionId]) {
                        this.opponentSessionIds = [
                           ...this.opponentSessionIds,
                           sessionId
                        ];
                        players[sessionId] = new Player(sessionId, player);

                        this._players$.next(players);
                     }
                  };

                  room.state.players.onRemove = (player, sessionId) => {
                     console.log(
                        '%cONREMOVE-PLAYER',
                        'color: orange',
                        player,
                        sessionId
                     );

                     this.opponentSessionIds = this.opponentSessionIds.filter(
                        x => x !== sessionId
                     );
                     const players = this._players$.getValue();
                     delete players[sessionId];
                     this._players$.next(players);
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
      this.gameRoom$
         .pipe(
            tap((room: Room) => {
               room.send(message);
            })
         )
         .subscribe();
   }

   setPlayer(player: RoomPlayerState, sessionId: string) {
      this.playerSessionId = sessionId;
      const players = this._players$.getValue();
      players[sessionId] = new Player(sessionId, player);
      players[sessionId];
      this._players$.next(players);

      console.log('%cPlayer', 'color: green', this._players$.value);
   }

   updatePlayer(player: RoomPlayerState, sessionId: string) {
      const players = this._players$.getValue();
      players[sessionId] = new Player(sessionId, player);
      this._players$.next(players);
   }

   addPlayer(player: RoomPlayerState, sessionId: string) {
      const players = this._players$.getValue();
      if (!players[sessionId]) {
         this.opponentSessionIds = [...this.opponentSessionIds, sessionId];
         players[sessionId] = new Player(sessionId, player);
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

   createExistingPlayers(playerList: { [id: string]: RoomPlayerState }) {
      const players = this._players$.getValue();
      const existingIds = [...this.opponentSessionIds, this.playerSessionId];
      const ids = Object.keys(playerList).filter(x => !existingIds.includes(x));
      ids.forEach(id => {
         const p: RoomPlayerState = playerList[id];
         players[id] = new Player(id, p);
      });
      this._players$.next(players);
      this.opponentSessionIds = [...this.opponentSessionIds, ...ids];

      console.log('%cExisting Player', 'color: blue', this._players$.value);
   }
}
