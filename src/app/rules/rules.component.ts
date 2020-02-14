import { Component, OnInit } from '@angular/core';
import { CardService } from '../services/card.service';
import { BaseComponent } from '../services/base-component';
import { switchMap } from 'rxjs/operators';

@Component({
   selector: 'app-rules',
   templateUrl: './rules.component.html',
   styleUrls: ['./rules.component.scss'],
   providers: [CardService]
})
export class RulesComponent extends BaseComponent {
   constructor(private cardService: CardService) {
      super();

      this.cardService
         .shuffle(1, true)
         .pipe(switchMap(x => this.cardService.draw(x.deck_id, 54)))
         .subscribe(console.log);
   }
}
