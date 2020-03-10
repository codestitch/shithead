import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../services/models';
import { BaseComponent } from 'src/app/services/base-component';
import { CardDeck } from 'src/app/components/deck/card';
import { filter } from 'rxjs/operators';

@Component({
   selector: 'xh-player',
   templateUrl: './player.component.html',
   styleUrls: ['./player.component.scss']
})
export class PlayerComponent extends BaseComponent {
   @Input() player: Player = new Player('', '');
   @Output() remove = new EventEmitter<string>();
   @Output() add = new EventEmitter<string>();
   @Output() update = new EventEmitter<string>();
   @Output() change = new EventEmitter<string>();

   hands: CardDeck[] = [];

   TEMP_IMAGE =
      'https://www.flaticon.com/premium-icon/icons/svg/1911/1911305.svg';

   events = [];

   constructor() {
      super();

      this.onChanges$.pipe(filter(x => !!x.player)).subscribe(c => {
         if (this.player && this.player.hands) {
            this.hands = this.player.hands.map(
               x =>
                  <CardDeck>{
                     code: x,
                     isSelected: false
                  }
            );
         }
      });
   }
}
