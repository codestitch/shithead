import { Injectable } from '@angular/core';
import { from, Observable, throwError, BehaviorSubject } from 'rxjs';
import { environment } from '@xhead/environment';
import * as Colyseus from 'colyseus.js';
import { map, shareReplay, tap } from 'rxjs/operators';
import { RoomAvailable } from 'colyseus.js/lib/Room';
import { RoomMetadata } from './models';
import { BaseService } from 'src/app/services/base-service';

@Injectable({
   providedIn: 'root'
})
export class RoomService extends BaseService {
   room$: Observable<Colyseus.Room>;
   _room$ = new BehaviorSubject<Colyseus.Room>(null);
   client = new Colyseus.Client(environment.connection);

   constructor() {
      super();

      this.room$ = this._room$.asObservable();

      this.onDestroy$.subscribe(() => this._room$.complete());
   }

   create(room: RoomMetadata): Observable<string> {
      const promise = this.client.create(environment.roomName, room);
      return from(promise).pipe(
         map(room => {
            this.setLocalState(room);
            return room.sessionId;
         }),
         shareReplay(1)
      );
   }

   joinById(roomId: string): Observable<string> {
      const promise = this.client.joinById(roomId);
      return from(promise).pipe(
         tap(room => {
            this.setLocalState(room);
            this._room$.next(room);
         }),
         map(room => room.sessionId),
         shareReplay(1)
      );
   }

   join(roomId: string, playerName: string): Observable<string> {
      const promise = this.client.join(environment.roomName, {
         roomId: roomId,
         playerName
      });
      return from(promise).pipe(
         tap(room => {
            this.setLocalState(room);
            this._room$.next(room);
         }),
         map(room => room.sessionId),
         shareReplay(1)
      );
   }

   availableRooms(): Observable<RoomAvailable<any>> {
      const promise = this.client.getAvailableRooms(environment.roomName);
      return from(promise).pipe(map(room => room as any));
   }

   reconnect() {
      const roomStatus = JSON.parse(localStorage.getItem('room'));
      const promise = this.client.reconnect<RoomMetadata>(
         roomStatus.id,
         roomStatus.sessionId
      );

      from(promise).subscribe(room => {
         const newStatus = { ...roomStatus, isActive: true };
         localStorage.setItem('room', JSON.stringify(newStatus));
         this._room$.next(room);
      });
   }

   private setLocalState(room: Colyseus.Room) {
      const roomSession = {
         id: room.id,
         sessionId: room.sessionId,
         isActive: true
      };
      localStorage.setItem('room', JSON.stringify(roomSession));
      this._room$.next(room);
   }
}
