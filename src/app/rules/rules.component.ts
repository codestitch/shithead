import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { BaseComponent } from '../services/base-component';
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Card } from '../services/models';

@Component({
   selector: 'xh-rules',
   templateUrl: './rules.component.html',
   styleUrls: ['./rules.component.scss'],
   providers: [CardService]
})

export class RulesComponent extends BaseComponent {
   sampleCards = [
      '3S',
      '4S',
      '5S',
      '6S',
      '7S',
      '8S',
      '9S',
      '0S',
      'JS',
      'QS',
      'KS',
      'AS',
      '2S',
      '3D'
   ];
   cards$: Observable<Card[]>;

   constructor(private cardService: CardService) {
      super();

      this.cards$ = this.cardService.partial(...this.sampleCards).pipe(
         switchMap(x =>
            this.cardService.draw(x.deck_id, this.sampleCards.length)
         ),
         map(c => c.cards)
      );
   }
}
