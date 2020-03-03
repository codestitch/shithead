import { Injectable } from '@angular/core';
import { CardService } from 'src/app/services/card.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { BaseService } from 'src/app/services/base-service';
import { map, tap, expand, take, delay, switchMap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { DealCommand, PlayerAttribute } from 'src/app/services/api-models';
import { GameAttribute } from 'src/app/services/api-models/game-attribute';

const STARTING_CARDS = 9;
const TEMP_IMAGE = 'https://image.flaticon.com/icons/svg/1141/1141093.svg';

@Injectable()
export class GameService extends BaseService {
   game$: Observable<GameAttribute>;
   playerCount = 2;
   players$: Observable<PlayerAttribute[]>;
   _players$ = new BehaviorSubject<PlayerAttribute[]>([]);

   constructor(private api: ApiService) {
      super();

      this.players$ = this._players$.asObservable();
   }

   setPlayer(count: number) {
      this.playerCount = count;
   }

   newDeal(playercount: number = 2, deckcount: number = 1, hasjoker: boolean = false): Observable<number> {
      return this.api.gameDealPost({ playercount, deckcount, hasjoker } as DealCommand).pipe(map(g => g.id));
   }

   newPlayer(name: string) {
      return this.game$.pipe(
         switchMap(game =>
            this.api.playerCreatePost({
               name: `player ${name}`,
               gameId: game.id
            })
         )
      );
   }

   // deal(playerNo: number): Observable<Player> {
   //    return this.deck$.pipe(
   //       switchMap(d => this.cardService.draw(d.deck_id, STARTING_CARDS)),
   //       map(cardDraw =>
   //          cardDraw.cards.map(
   //             x =>
   //                <Card>{
   //                   ...x,
   //                   image: TEMP_IMAGE
   //                }
   //          )
   //       ),
   //       map(
   //          card =>
   //             <Player>{
   //                name: `Player ${playerNo}`,
   //                blinds: card.slice(0, 3),
   //                hands: card.slice(3)
   //             }
   //       )
   //    );
   // }
}
