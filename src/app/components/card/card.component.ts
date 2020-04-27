import { Component, Input, HostBinding } from '@angular/core';
import {
   card0C,
   card0D,
   card0H,
   card0S,
   card2C,
   card2D,
   card2H,
   card2S,
   card3C,
   card3D,
   card3H,
   card3S,
   card4C,
   card4D,
   card4H,
   card4S,
   card5C,
   card5D,
   card5H,
   card5S,
   card6C,
   card6D,
   card6H,
   card6S,
   card7C,
   card7D,
   card7H,
   card7S,
   card8C,
   card8D,
   card8H,
   card8S,
   card9C,
   card9D,
   card9H,
   card9S,
   cardAC,
   cardAD,
   cardAH,
   cardAS,
   cardbackBottom,
   cardbackTop,
   cardback,
   cardJC,
   cardJD,
   cardJH,
   cardJS,
   cardKC,
   cardKD,
   cardKH,
   cardKS,
   cardQC,
   cardQD,
   cardQH,
   cardQS,
   cardX1,
   cardX2
} from '../../../assets';
import { BaseComponent } from 'src/app/services/base-component';
import { filter } from 'rxjs/operators';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
   selector: 'xh-card',
   templateUrl: './card.component.html',
   styleUrls: ['./card.component.scss']
})
export class CardComponent extends BaseComponent {
   @HostBinding('class.selected')
   @Input()
   isSelected: boolean;
   @Input() code: string;
   @Input() image: string;

   selectedCard: string;
   pool = [
      { code: '0C', value: card0C },
      { code: '0D', value: card0D },
      { code: '0H', value: card0H },
      { code: '0S', value: card0S },
      { code: '2C', value: card2C },
      { code: '2D', value: card2D },
      { code: '2H', value: card2H },
      { code: '2S', value: card2S },
      { code: '3C', value: card3C },
      { code: '3D', value: card3D },
      { code: '3H', value: card3H },
      { code: '3S', value: card3S },
      { code: '4C', value: card4C },
      { code: '4D', value: card4D },
      { code: '4H', value: card4H },
      { code: '4S', value: card4S },
      { code: '5C', value: card5C },
      { code: '5D', value: card5D },
      { code: '5H', value: card5H },
      { code: '5S', value: card5S },
      { code: '6C', value: card6C },
      { code: '6D', value: card6D },
      { code: '6H', value: card6H },
      { code: '6S', value: card6S },
      { code: '7C', value: card7C },
      { code: '7D', value: card7D },
      { code: '7H', value: card7H },
      { code: '7S', value: card7S },
      { code: '8C', value: card8C },
      { code: '8D', value: card8D },
      { code: '8H', value: card8H },
      { code: '8S', value: card8S },
      { code: '9C', value: card9C },
      { code: '9D', value: card9D },
      { code: '9H', value: card9H },
      { code: '9S', value: card9S },
      { code: 'AC', value: cardAC },
      { code: 'AD', value: cardAD },
      { code: 'AH', value: cardAH },
      { code: 'AS', value: cardAS },
      { code: 'backBottom', value: cardbackBottom },
      { code: 'backTop', value: cardbackTop },
      { code: 'back', value: cardback },
      { code: 'JC', value: cardJC },
      { code: 'JD', value: cardJD },
      { code: 'JH', value: cardJH },
      { code: 'JS', value: cardJS },
      { code: 'KC', value: cardKC },
      { code: 'KD', value: cardKD },
      { code: 'KH', value: cardKH },
      { code: 'KS', value: cardKS },
      { code: 'QC', value: cardQC },
      { code: 'QD', value: cardQD },
      { code: 'QH', value: cardQH },
      { code: 'QS', value: cardQS },
      { code: 'X1', value: cardX1 },
      { code: 'X2', value: cardX2 }
   ];
   constructor() {
      super();

      this.onChanges$.pipe(filter(c => !!c && !!c.code)).subscribe(change => {
         console.log('rending card:', this.code);
         if (this.code === 'ZD') {
            this.code = '3D'
         } else if (this.code === 'ZH') {
            this.code = '3H'
         }

         this.selectedCard = this.pool.filter(
            x => x.code === this.code
         )[0].value;
      });
   }
}
