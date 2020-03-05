import { Component, OnInit, Input } from '@angular/core';

@Component({
   selector: 'xh-player',
   templateUrl: './player.component.html',
   styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
   @Input() blinds: string[];
   @Input() hands: string[];
   @Input() draw: string[];
   events = [];

   constructor() {}

   ngOnInit(): void {}

   clearEvents(): void {
      this.events = [];
   }

   itemsRemoved(ev, list) {
      this.events.push({
         text: `itemsRemoved from ${list}`,
         ev: JSON.stringify(ev)
      });
   }

   itemsAdded(ev, list) {
      this.events.push({
         text: `itemsAdded to ${list}`,
         ev: JSON.stringify(ev)
      });
   }

   itemsUpdated(ev, list) {
      this.events.push({
         text: `itemsUpdated in ${list}`,
         ev: JSON.stringify(ev)
      });
   }

   selectionChanged(ev, list) {
      this.events.push({
         text: `selectionChanged in ${list}`,
         ev: JSON.stringify(ev)
      });
   }
}
