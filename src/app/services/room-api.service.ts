import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { environment } from '@xhead/environment';
import * as Colyseus from 'colyseus.js';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { RoomAvailable } from 'colyseus.js/lib/Room';
import { RoomMetadata } from './models/room-metadata';

@Injectable()
export class RoomApiService {
   room$: Observable<Colyseus.Room>;
   client = new Colyseus.Client(environment.connection);

   constructor() {}

   create(room: RoomMetadata): Observable<string> {
      const { name, hasJoker, deckCount, maxPlayer } = room;
      const promise = this.client.create(environment.roomName, {
         name,
         hasJoker,
         deckCount,
         maxPlayer
      });
      this.room$ = from(promise).pipe(
         map(room => room),
         shareReplay(1)
      );
      return this.room$.pipe(map(room => room.id));
   }

   joinById(roomId: string): Observable<string> {
      const promise = this.client.joinById(roomId);
      this.room$ = from(promise).pipe(
         map(room => room),
         shareReplay(1)
      );
      return this.room$.pipe(map(room => room.id));
   }

   join(roomId: string, playerName: string): Observable<string> {
      const promise = this.client.join(environment.roomName, {
         roomId: roomId,
         playerName
      });
      this.room$ = from(promise).pipe(
         map(room => room),
         shareReplay(1)
      );
      return this.room$.pipe(map(room => room.id));
   }

   availableRooms(): Observable<RoomAvailable<any>> {
      const promise = this.client.getAvailableRooms(environment.roomName);
      return from(promise).pipe(map(room => room as any));
   }
}
