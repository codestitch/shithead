import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@xhead/environment';
import { CardDeck, CardDraw } from './models';

@Injectable()
export class CardService {
   constructor(private httpClient: HttpClient) {}

   shuffle(
      deckCount: number = 1,
      hasJoker: boolean = false
   ): Observable<CardDeck> {
      const url = `${environment.cardApi}/new/shuffle/?deck_count=${deckCount}&jokers_enabled=${hasJoker}`;
      return this.httpClient.get(url) as Observable<CardDeck>;
   }

   draw(deckId: string, count: number): Observable<CardDraw> {
      const url = `${environment.cardApi}/${deckId}/draw/?count=${count}`;
      return this.httpClient.get(url) as Observable<CardDraw>;
   }

   reshuffle(deckId: string): Observable<CardDeck> {
      const url = `${environment.cardApi}/${deckId}/shuffle`;
      return this.httpClient.get(url) as Observable<CardDeck>;
   }

   partial(...cards: string[]) {
      const url = `${environment.cardApi}/new/shuffle/?cards=${cards}`;
      return this.httpClient.get(url) as Observable<CardDeck>;
   }
}
