import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../services/models';
import { BaseComponent } from 'src/app/services/base-component';
import { filter } from 'rxjs/operators';

@Component({
   selector: 'xh-opponent',
   templateUrl: './opponent.component.html',
   styleUrls: ['./opponent.component.scss']
})
export class OpponentComponent extends BaseComponent {
   @Input() player: Player = new Player();
   hands: string[] = [];
   trumps: string[] = [];
   blinds: string[] = [];

   constructor() {
      super();
      this.onChanges$.pipe(filter(x => !!x.player)).subscribe(c => {
         if (this.player) {
            this.hands = this.player.hands;
            this.trumps = this.player.trumps;
            this.blinds = this.player.blinds;
         }
      });
   }
}
