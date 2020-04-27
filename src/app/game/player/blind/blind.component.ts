import { Component, OnInit, Input } from '@angular/core';
@Component({
   selector: 'xh-blind',
   templateUrl: './blind.component.html',
   styleUrls: ['./blind.component.scss']
})
export class BlindComponent implements OnInit {
   @Input() cards: string[];

   constructor() {}

   ngOnInit(): void {}
}
