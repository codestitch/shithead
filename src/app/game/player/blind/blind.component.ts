import { Component, OnInit, Input } from '@angular/core';

@Component({
   selector: 'xh-blind',
   templateUrl: './blind.component.html',
   styleUrls: ['./blind.component.scss']
})
export class BlindComponent implements OnInit {
   TEMP_IMG = 'https://image.flaticon.com/icons/svg/2560/2560722.svg';
   @Input() faceDown: string[];
   @Input() faceUp: string[];

   constructor() {}

   ngOnInit(): void {}
}
