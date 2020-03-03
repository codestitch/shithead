import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { DealCommand } from 'src/app/services/api-models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
   selector: 'xh-create',
   templateUrl: './create.component.html',
   styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
   gameCommand: DealCommand = {
      deckcount: 1,
      hasjoker: false,
      playercount: 2
   };

   constructor(
      private gameService: GameService,
      private router: Router,
      private route: ActivatedRoute
   ) {}

   ngOnInit(): void {}

   deal() {
      const { deckcount, hasjoker, playercount } = this.gameCommand;
      this.gameService
         .newDeal(playercount, deckcount, hasjoker)
         .subscribe(gameId => this.router.navigate([`/game/play/${gameId}`]));
   }

   choose(ev) {
      console.log(ev);
   }
}
