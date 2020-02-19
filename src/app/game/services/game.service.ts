import { Injectable } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Player } from '../models/player';
import { BaseService } from 'src/app/services/base-service';
import { Card, CardDeck } from 'src/app/services/models';
import { switchMap, map } from 'rxjs/operators';

const STARTING_CARDS = 9;
const TEMP_IMAGE = 'https://image.flaticon.com/icons/svg/1141/1141093.svg';

@Injectable()
export class GameService extends BaseService {
   deck$: Observable<CardDeck>;
   playerCount = 2;
   players$: Observable<Player[]>;
   _players$ = new BehaviorSubject<Player[]>([]);

   constructor(private cardService: CardService) {
      super();

      this.players$ = this._players$.asObservable();
      this.deck$ = this.cardService.shuffle(1);
   }

   play() {
      let count = 1;
      do {
         this.deal(count)
            .pipe(
               map(player => {
                  const current = this._players$.getValue();
                  this._players$.next([...current, player]);
               })
            )
            .subscribe();
         count++;
      } while (count <= this.playerCount);
   }

   deal(playerNo: number): Observable<Player> {
      return this.deck$.pipe(
         switchMap(d => this.cardService.draw(d.deck_id, STARTING_CARDS)),
         map(cardDraw =>
            cardDraw.cards.map(
               x =>
                  <Card>{
                     ...x,
                     image: TEMP_IMAGE
                  }
            )
         ),
         map(
            card =>
               <Player>{
                  name: `Player ${playerNo}`,
                  blinds: card.slice(0, 3),
                  hands: card.slice(3)
               }
         )
      );
   }
}
