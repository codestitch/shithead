import { Component, HostListener } from '@angular/core';
import { BaseComponent } from 'src/app/services/base-component';
import { StateAction, Player, PileEmit } from '../services/models';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services';
import { cardtable } from '../../../assets/';
import { MockOpponent } from '../opponent/mock-opponent';

@Component({
   selector: 'xh-play',
   templateUrl: './play.component.html',
   styleUrls: ['./play.component.scss']
})
export class PlayComponent extends BaseComponent {
   table = cardtable;
   isCreator = false;
   players: { [id: string]: Player } = {};
   MOCK_OPPONENT = MockOpponent;

   constructor(private route: ActivatedRoute, public gameService: GameService) {
      super();

      this.onInit$.subscribe(() => {
         this.isCreator =
            this.route.snapshot.paramMap.get('status') === 'creator';

         this.gameService.players$.subscribe(x => (this.players = x));
      });
   }
   
   start() {
      this.gameService.send({ action: StateAction.START, data: null });
   }

   draw() {
      this.gameService.send({
         action: StateAction.DRAW,
         data: {
            count: 2
         }
      });
   }

   setTrump(trumps: string[]) {
      this.gameService.send({
         action: StateAction.TRUMP,
         data: {
            cards: trumps
         }
      });
   }

   add(event: PileEmit) {
      console.log('Add', event);
   }

   change(event: PileEmit) {
      console.log('Changed', event);
   }

   remove(event: PileEmit) {
      console.log('Removed', event);
   }

   update(event: PileEmit) {
      console.log('Update', event);
      if (event.pile === 'trump' && event.cards.length === 3) {
         this.setTrump(event.cards);
      }
   }
}
