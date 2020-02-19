import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
   selector: 'xh-card',
   templateUrl: './card.component.html',
   styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
   @HostBinding('class.selected')
   @Input()
   isSelected: boolean;
   @Input() code: string;
   @Input() image: string;
   constructor() {}

   ngOnInit(): void {}
}
