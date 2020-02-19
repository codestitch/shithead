import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/services/models';

@Component({
   selector: 'xh-blind',
   templateUrl: './blind.component.html',
   styleUrls: ['./blind.component.scss']
})
export class BlindComponent implements OnInit {
   TEMP_IMG = 'https://image.flaticon.com/icons/svg/2560/2560722.svg';
   @Input() faceDown: Card[];
   @Input() faceUp: Card[];

   constructor() {}

   ngOnInit(): void {}
}
