import {
   Component,
   OnInit,
   Output,
   EventEmitter,
   Input
} from '@angular/core';

@Component({
   selector: 'xh-play-pile',
   templateUrl: './play-pile.component.html',
   styleUrls: ['./play-pile.component.scss']
})
export class PlayPileComponent implements OnInit {
   @Input() cards: string[];
   @Output() remove = new EventEmitter<string>();
   @Output() add = new EventEmitter<string>();
   @Output() update = new EventEmitter<string>();
   @Output() change = new EventEmitter<string>();

   TEMP_IMAGE =
      'https://www.flaticon.com/premium-icon/icons/svg/1911/1911305.svg';
   
   constructor() {}

   ngOnInit(): void {}
}
