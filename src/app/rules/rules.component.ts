import { Component } from '@angular/core';
import { BaseComponent } from '../services/base-component';
import { Observable } from 'rxjs';

@Component({
   selector: 'xh-rules',
   templateUrl: './rules.component.html',
   styleUrls: ['./rules.component.scss']
})
export class RulesComponent extends BaseComponent {
   sampleCards = [
      '3S',
      '4S',
      '5S',
      '6S',
      '7S',
      '8S',
      '9S',
      '0S',
      'JS',
      'QS',
      'KS',
      'AS',
      '2S',
      '3D'
   ];
   cards$: Observable<string[]>;

   constructor() {
      super();
   }
}
