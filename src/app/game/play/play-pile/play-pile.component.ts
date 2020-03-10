import {
   Component,
   OnInit,
   Output,
   EventEmitter,
   Input
} from '@angular/core';
import { PileEmit } from '../../services/models';

@Component({
   selector: 'xh-play-pile',
   templateUrl: './play-pile.component.html',
   styleUrls: ['./play-pile.component.scss']
})
export class PlayPileComponent implements OnInit {
   @Input() cards: string[];
   @Output() remove = new EventEmitter<PileEmit>();
   @Output() add = new EventEmitter<PileEmit>();
   @Output() update = new EventEmitter<PileEmit>();
   @Output() change = new EventEmitter<PileEmit>();

   TEMP_IMAGE =
      'https://www.flaticon.com/premium-icon/icons/svg/1911/1911305.svg';
   
   constructor() {}

   ngOnInit(): void {}
}
