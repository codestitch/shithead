import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { Observable } from 'rxjs';
import { Card } from '../services/models';
import { map, switchMap, tap, take } from 'rxjs/operators';

@Component({
   selector: 'xh-game',
   templateUrl: './game.component.html',
   styleUrls: ['./game.component.scss'],
   providers: [CardService]
})
export class GameComponent implements OnInit {
   events = [];
   cards$: Observable<Card[]>;
   constructor(private cardService: CardService) {
      this.cards$ = this.cardService.shuffle(1).pipe(
         switchMap(c => this.cardService.draw(c.deck_id, 10)),
         // map(c => c.cards),
         map(c => c.cards.map(x => <Card>{
            code: x.code,
            image: 'https://image.flaticon.com/icons/svg/1141/1141093.svg',
            suit: x.suit,
            value: x.value
         })),
         tap(c => {
            const codes = c.map(i => i.code);
            this.events.push(
               {text: `items from 1`, ev: JSON.stringify(codes)}
            )
         })
      );
   }

   ngOnInit(): void {}
   clearEvents(): void {
     this.events = [];
   }

   itemsRemoved(ev, list) {
     this.events.push({text: `itemsRemoved from ${list}`, ev: JSON.stringify(ev)});
   }
 
   itemsAdded(ev, list) {
     this.events.push({text: `itemsAdded to ${list}`, ev: JSON.stringify(ev)});
   }
 
   itemsUpdated(ev, list) {
     this.events.push({text: `itemsUpdated in ${list}`, ev: JSON.stringify(ev)});
   }
 
   selectionChanged(ev, list) {
     this.events.push({text: `selectionChanged in ${list}`, ev: JSON.stringify(ev)});
   }
}
