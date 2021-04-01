import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { BaseComponent } from 'src/app/services/base-component';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../services';
import { cardtable } from '../../../assets/';
import { MockOpponent } from '../opponent/mock-opponent';
import { ScreensizeService } from 'src/app/services/screensize.service';
import { Player, StateAction, PileEmit } from '../models';
import { StatelogService } from '../services/statelog.service';
import { Observable } from 'rxjs';

@Component({
   selector: 'xh-play',
   templateUrl: './play.component.html',
   styleUrls: ['./play.component.scss']
})
export class PlayComponent extends BaseComponent {
   @ViewChild('tableEl') tableEl: ElementRef;
   table = cardtable;
   isCreator = false;
   players: { [id: string]: Player } = {};
   MOCK_OPPONENT = MockOpponent;
   stateMessage$: Observable<string>;

   constructor(
      private route: ActivatedRoute,
      public gameService: GameService,
      private statelog: StatelogService,
      private screenSize: ScreensizeService,
      private renderer: Renderer2
   ) {
      super();

      this.onInit$.subscribe(() => {
         this.isCreator =
            this.route.snapshot.paramMap.get('status') === 'creator';

         this.stateMessage$ = this.statelog.message$;
         this.gameService.players$.subscribe(x => {
            const message = this.isCreator
               ? 'Waiting for other players'
               : `Waiting for dealer to start dealin`;
            this.statelog.set(message);

            this.players = x;
         });
      });

      // this.onAfterViewInit$
      //    .pipe(switchMap(x => this.screenSize.tableSize$))
      //    .subscribe(size => {
      //       console.log(size)
      //       this.renderer.setStyle(
      //          this.tableEl.nativeElement,
      //          'width',
      //          `${size.width}px`
      //       );
      //       this.renderer.setStyle(
      //          this.tableEl.nativeElement,
      //          'height',
      //          `${size.height}px`
      //       );
      //    });
   }

   start() {
      console.log('START!');
      this.gameService.send({ action: StateAction.StartGame, data: null });
   }

   draw() {
      this.gameService.send({
         action: StateAction.DrawCard,
         data: {
            count: 2
         }
      });
   }

   setTrump(trumps: string[]) {
      this.gameService.send({
         action: StateAction.SetTrump,
         data: {
            cards: trumps
         }
      });
   }

   add(event: PileEmit) {
      // console.log('Add', event);
   }

   change(event: PileEmit) {
      // console.log('Changed', event);
   }

   remove(event: PileEmit) {
      // console.log('Removed', event);
   }

   update(event: PileEmit) {
      // console.log('Update', event);
      if (event.pile === 'trump' && event.cards.length === 3) {
         this.setTrump(event.cards);
      }
   }
}
