import { Component } from '@angular/core';
import * as Colyseus from 'colyseus.js';
import { BaseComponent } from 'src/app/services/base-component';
import { StateAction, Player } from '../services/models';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services';

@Component({
   selector: 'xh-play',
   templateUrl: './play.component.html',
   styleUrls: ['./play.component.scss']
})
export class PlayComponent extends BaseComponent {
   isCreator = false;
   players: { [id: string]: Player } = {};

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

   setTrump() {
      this.gameService.send({
         action: StateAction.TRUMP,
         data: {
            cards: ''
         }
      });
   }

   playAdd(event) {
      console.log('play Add', event);
   }

   playChange(event) {
      console.log('play Changed', event);
   }

   playRemove(event) {
      console.log('play Removed', event);
   }

   playUpdate(event) {
      console.log('play Update', event);
   }

   playerAdd(event) {
      console.log('Player Add', event);
   }

   playerChange(event) {
      console.log('Player Changed', event);
   }

   playerRemove(event) {
      console.log('Player Removed', event);
   }

   playerUpdate(event) {
      console.log('Player Update', event);
   }
}
