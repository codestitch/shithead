import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player, PileEmit, Pile, PlayerStatePhase } from '../services/models';
import { BaseComponent } from 'src/app/services/base-component';
import { CardDeck } from 'src/app/components/deck/card';
import { filter } from 'rxjs/operators';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { cardAC, cardAH } from '../../../assets';

@Component({
   selector: 'xh-player',
   templateUrl: './player.component.html',
   styleUrls: ['./player.component.scss']
})
export class PlayerComponent extends BaseComponent {
   @Input() player: Player;
   @Output() remove = new EventEmitter<PileEmit>();
   @Output() add = new EventEmitter<PileEmit>();
   @Output() update = new EventEmitter<PileEmit>();
   @Output() change = new EventEmitter<PileEmit>();

   isTrumpComplete: boolean = false;
   hands: string[] = [];
   trumps: string[] = [];
   blinds: string[] = [];
   isTurn: boolean = false;
   trumpPredicate = () => this.trumps.length + 1 <= 3;

   firstUse = cardAH;

   TEMP_IMAGE =
      'https://www.flaticon.com/premium-icon/icons/svg/1911/1911305.svg';
   TEMP_BLIND = 'https://image.flaticon.com/icons/svg/2560/2560722.svg';

   events = [];

   constructor() {
      super();

      this.onChanges$.pipe(filter(x => !!x.player)).subscribe(c => {
         if (this.player) {
            this.hands = this.player.hands;
            this.trumps = this.player.trumps;
            this.blinds = this.player.blinds;
            this.isTrumpComplete = this.player.phase === PlayerStatePhase.HAND;
         }
      });
   }

   added(ev: string[], pile: Pile) {
      this.add.emit({ cards: ev, pile: pile } as PileEmit);
   }

   removed(ev: string[], pile: Pile) {
      this.remove.emit({ cards: ev, pile: pile } as PileEmit);
   }

   updated(ev: string[], pile: Pile) {
      if (pile === 'trump') {
         this.isTrumpComplete = ev.length === 3;
      }
      this.update.emit({ cards: ev, pile: pile } as PileEmit);
   }

   changed(ev: string[], pile: Pile) {
      this.change.emit({ cards: ev, pile: pile } as PileEmit);
   }
}
