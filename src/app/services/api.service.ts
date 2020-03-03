import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@xhead/environment';
import { Observable } from 'rxjs';
import { DealCommand, PlayerAttribute, GameAttribute } from './api-models';

@Injectable({
   providedIn: 'root'
})
export class ApiService {
   constructor(private http: HttpClient) {}

   gameDealPost(payload: DealCommand): Observable<GameAttribute> {
      const { hasjoker, deckcount, playercount } = payload;
      return this.http.post<GameAttribute>(`${environment.api}/games/deal`, {
         hasjoker,
         deckcount,
         playercount
      });
   }

   gameDrawGet(payload: { gameId: number; drawCount: number }) {
      return this.http.get(
         `${environment.api}/games/${payload.gameId}/draw?count=${payload.drawCount}`
      );
   }

   gameDrawCommitGet(payload: { gameId: number; drawCount: number }) {
      return this.http.get(
         `${environment.api}/games/${payload.gameId}/draw?count=${payload.drawCount}`
      );
   }

   playerCreatePost(payload: {
      name: string;
      gameId: number;
   }): Observable<PlayerAttribute> {
      const { name, gameId } = payload;
      return this.http.post<PlayerAttribute>(
         `${environment.api}/players/create`,
         {
            name,
            gameId
         }
      );
   }

   playerNewCardsPost(payload: { playerId: number }) {
      const { playerId } = payload;
      return this.http.post(`${environment.api}/players/newcards`, {
         playerId
      });
   }
}
